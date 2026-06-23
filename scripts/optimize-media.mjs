/**
 * Comprehensive media optimization:
 * - Videos: ffmpeg H.264 CRF 30, 720p max, 24fps, strip audio
 * - Images: convert to WebP (lossy Q70, 1200px max width)
 *
 * Usage: node scripts/optimize-media.mjs
 */
import { execSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { readdir, stat, writeFile, rename, unlink, rm } from 'node:fs/promises';
import { extname, join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const ffmpegPath = ffmpegInstaller.path;
const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');

const MAX_WIDTH = 1200;
const WEBP_QUALITY = 70;
const VIDEO_CRF = 30;
const VIDEO_MAX_HEIGHT = 720;
const MIN_SIZE_KB = 20;

const VIDEO_EXTENSIONS = new Set(['.mp4', '.mov', '.webm']);
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

function formatMB(bytes) { return (bytes / 1024 / 1024).toFixed(1); }
function formatKB(bytes) { return (bytes / 1024).toFixed(0); }

async function safeWrite(filePath, buffer) {
  const tmpFile = join(dirname(filePath), `.tmp-${randomBytes(6).toString('hex')}`);
  try {
    await writeFile(tmpFile, buffer);
    await rename(tmpFile, filePath);
  } catch (err) {
    try { await unlink(tmpFile); } catch {}
    throw err;
  }
}

async function* walk(dir, extensions) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath, extensions);
    } else if (extensions.has(extname(entry.name).toLowerCase())) {
      yield fullPath;
    }
  }
}

async function optimizeVideo(filePath) {
  const originalSize = statSync(filePath).size;
  const originalMB = formatMB(originalSize);

  if (originalSize < 500 * 1024) {
    console.log(`  SKIP (${originalMB}MB, already small): ${filePath}`);
    return { skipped: true, saved: 0 };
  }

  const tempFile = join(dirname(filePath), `.vid-tmp-${randomBytes(6).toString('hex')}.mp4`);

  try {
    // Two-pass: first scale, then encode
    const args = [
      '-y',
      '-i', filePath,
      '-vf', 'scale=1280:-2',
      '-r', '24',
      '-c:v', 'libx264',
      '-crf', String(VIDEO_CRF),
      '-preset', 'fast',
      '-an',               // strip audio
      '-movflags', '+faststart',
      '-pix_fmt', 'yuv420p',
      tempFile
    ];

    console.log(`  Encoding (original: ${originalMB}MB)...`);
    execSync(`"${ffmpegPath}" ${args.join(' ')}`, {
      stdio: 'pipe',
      timeout: 600000  // 10 minutes max
    });

    const newSize = statSync(tempFile).size;
    const newMB = formatMB(newSize);
    const savedPercent = ((1 - newSize / originalSize) * 100).toFixed(0);

    // Replace original with compressed version
    await rename(tempFile, filePath);
    console.log(`  DONE ${originalMB}MB → ${newMB}MB (-${savedPercent}%): ${filePath}`);
    return { skipped: false, saved: originalSize - newSize };
  } catch (err) {
    try { await unlink(tempFile); } catch {}
    console.error(`  ERROR: ${filePath} - ${err.message}`);
    return { skipped: true, saved: 0 };
  }
}

async function optimizeImageToWebp(filePath) {
  const ext = extname(filePath).toLowerCase();
  const originalSize = statSync(filePath).size;
  const originalKB = formatKB(originalSize);

  if (originalSize < MIN_SIZE_KB * 1024) {
    console.log(`  SKIP (${originalKB}KB): ${filePath}`);
    return { skipped: true, saved: 0, newPath: null };
  }

  const webpPath = filePath.replace(ext, '.webp');
  const tempFile = join(dirname(filePath), `.img-tmp-${randomBytes(6).toString('hex')}.webp`);

  try {
    const metadata = await sharp(filePath).metadata();
    let pipeline = sharp(filePath);

    // Resize if too wide
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }

    pipeline = pipeline.webp({
      quality: WEBP_QUALITY,
      effort: 6,
      lossless: false,
    });

    const optimized = await pipeline.toBuffer();

    await writeFile(tempFile, optimized);
    await rename(tempFile, webpPath);

    const newKB = formatKB(optimized.length);
    const savedPercent = ((1 - optimized.length / originalSize) * 100).toFixed(0);

    // Delete original file
    await unlink(filePath);

    console.log(`  DONE ${originalKB}KB → ${newKB}KB (-${savedPercent}%): ${basename(filePath)} → ${basename(webpPath)}`);
    return { skipped: false, saved: originalSize - optimized.length, newPath: webpPath };
  } catch (err) {
    try { await unlink(tempFile); } catch {}
    console.error(`  ERROR: ${filePath} - ${err.message}`);
    return { skipped: true, saved: 0, newPath: null };
  }
}

async function main() {
  console.log('=== VIDEO OPTIMIZATION ===\n');

  let videoSaved = 0, videoFiles = 0, videoSkipped = 0;
  for await (const videoPath of walk(PUBLIC_DIR, VIDEO_EXTENSIONS)) {
    videoFiles++;
    const result = await optimizeVideo(videoPath);
    if (result.skipped) videoSkipped++;
    else videoSaved += result.saved;
  }
  console.log(`\nVideos: ${videoFiles} processed, ${videoSkipped} skipped, saved ${formatMB(videoSaved)}MB`);

  console.log('\n=== IMAGE → WEBP CONVERSION ===\n');

  let imgSaved = 0, imgFiles = 0, imgSkipped = 0;
  const changedPaths = []; // [oldRelative, newRelative]
  for await (const imgPath of walk(PUBLIC_DIR, IMAGE_EXTENSIONS)) {
    imgFiles++;
    const result = await optimizeImageToWebp(imgPath);
    if (result.skipped) {
      imgSkipped++;
    } else {
      imgSaved += result.saved;
      if (result.newPath) {
        changedPaths.push({
          old: '/' + basename(dirname(result.newPath)) + '/' + basename(imgPath),
          new: '/' + basename(dirname(result.newPath)) + '/' + basename(result.newPath),
        });
      }
    }
  }
  console.log(`\nImages: ${imgFiles} processed, ${imgSkipped} skipped, saved ${formatMB(imgSaved)}MB`);

  const totalMB = formatMB(videoSaved + imgSaved);
  console.log(`\n=== TOTAL SAVED: ${totalMB}MB ===`);
  console.log('\n⚠️  IMPORTANT: Image extensions changed (.png/.jpg → .webp).');
  console.log('Run "node scripts/update-refs.mjs" to update all code references.');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
