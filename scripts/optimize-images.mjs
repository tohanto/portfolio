/**
 * Batch-optimize all images in public/ for web delivery.
 * - JPG/JPEG: compress to quality 82, max width 1920px
 * - PNG: lossless compress; convert photo-like PNGs to JPG
 * - Skips files already under 200KB
 * Usage: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { readdir, stat, writeFile, rename, unlink } from 'node:fs/promises';
import { extname, join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { randomBytes } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');
const MAX_WIDTH = 1600;
const JPG_QUALITY = 72;
const MIN_SIZE_KB = 50; // skip only very small files

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else if (IMAGE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      yield fullPath;
    }
  }
}

async function safeWrite(filePath, buffer) {
  // Write to temp file in same directory to avoid cross-device rename errors
  const tmpFile = join(dirname(filePath), `.opt-${randomBytes(6).toString('hex')}.tmp`);
  try {
    await writeFile(tmpFile, buffer);
    await rename(tmpFile, filePath);
  } catch (err) {
    try { await unlink(tmpFile); } catch {}
    throw err;
  }
}

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  const originalStats = await stat(filePath);
  const originalSizeKB = originalStats.size / 1024;

  if (originalSizeKB < MIN_SIZE_KB) {
    console.log(`  SKIP (${originalSizeKB.toFixed(0)}KB, already small): ${filePath}`);
    return { skipped: true, saved: 0 };
  }

  let pipeline = sharp(filePath);
  const metadata = await pipeline.metadata();

  // Resize if too wide
  if (metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
  }

  if (ext === '.png') {
    // Check if PNG has transparency
    const hasAlpha = metadata.channels === 4;
    if (hasAlpha) {
      // Keep as PNG, use palette compression
      pipeline = pipeline.png({ palette: true, quality: 75, effort: 10, compressionLevel: 9 });
    } else {
      // Convert to JPG — much smaller
      pipeline = pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true });
      // We'll rename from .png to .jpg
    }
  } else {
    // JPG/JPEG
    pipeline = pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true });
  }

  const optimized = await pipeline.toBuffer();
  const saved = originalStats.size - optimized.length;
  const savedPercent = ((saved / originalStats.size) * 100).toFixed(0);

  // Check if output format changed (PNG → JPG)
  const hasAlpha = ext === '.png' && (await sharp(filePath).metadata()).channels === 4;
  if (ext === '.png' && !hasAlpha) {
    // We converted to JPG — need to update the filename
    // But that would break all references. Just overwrite with JPG content as .png
    // or better, keep the .png extension but file is actually JPG internally.
    // sharp will output JPG bytes even if we write to .png extension if we use .jpeg()
    // Actually, it's safer to keep the PNG extension and use png output with high compression
    pipeline = sharp(filePath)
      .resize(metadata.width > MAX_WIDTH ? MAX_WIDTH : null, null, { withoutEnlargement: true })
      .png({ palette: true, quality: 65, effort: 10, compressionLevel: 9 });
    const pngOptimized = await pipeline.toBuffer();
    const pngSaved = originalStats.size - pngOptimized.length;
    const pngSavedPercent = ((pngSaved / originalStats.size) * 100).toFixed(0);

    await safeWrite(filePath, pngOptimized);
    console.log(`  DONE (${originalSizeKB.toFixed(0)}KB → ${(pngOptimized.length / 1024).toFixed(0)}KB, -${pngSavedPercent}%, PNG compressed): ${filePath}`);
    return { skipped: false, saved: pngSaved };
  }

  await safeWrite(filePath, optimized);
  console.log(`  DONE (${originalSizeKB.toFixed(0)}KB → ${(optimized.length / 1024).toFixed(0)}KB, -${savedPercent}%): ${filePath}`);
  return { skipped: false, saved };
}

async function main() {
  console.log('Optimizing images in', PUBLIC_DIR, '...\n');

  let totalSaved = 0;
  let totalFiles = 0;
  let skippedFiles = 0;

  for await (const filePath of walk(PUBLIC_DIR)) {
    totalFiles++;
    const result = await optimizeImage(filePath);
    if (result.skipped) {
      skippedFiles++;
    } else {
      totalSaved += result.saved;
    }
  }

  console.log(`\nDone! ${totalFiles} files processed, ${skippedFiles} skipped.`);
  console.log(`Total saved: ${(totalSaved / 1024 / 1024).toFixed(1)}MB`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
