/**
 * Update all code references from .png/.jpg/.jpeg → .webp
 * after optimize-media.mjs has converted the images.
 *
 * Usage: node scripts/update-refs.mjs
 */
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { extname, join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const PUBLIC_DIR = join(ROOT_DIR, 'public');
const SRC_DIR = join(ROOT_DIR, 'src');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);
const TEXT_EXTENSIONS = new Set(['.ts', '.tsx', '.json', '.js', '.css', '.mjs']);

async function* walk(dir, extensions) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== 'dist') {
        yield* walk(fullPath, extensions);
      }
    } else if (extensions.has(extname(entry.name).toLowerCase())) {
      yield fullPath;
    }
  }
}

async function main() {
  // Step 1: Find all .webp files in public/ and build mapping
  console.log('Scanning public/ for WebP files...\n');
  const webpMap = new Map(); // basename → ext

  for await (const webpPath of walk(PUBLIC_DIR, new Set(['.webp']))) {
    const name = basename(webpPath, '.webp');
    // Check which original extensions were converted
    for (const ext of ['.png', '.jpg', '.jpeg']) {
      const originalPath = join(dirname(webpPath), name + ext);
      try {
        await stat(originalPath);
        // Original still exists (shouldn't normally, but check)
      } catch {
        webpMap.set(name + ext, name + '.webp');
        break;
      }
    }
  }

  if (webpMap.size === 0) {
    console.log('No WebP conversions found. Nothing to update.');
    return;
  }

  console.log(`Found ${webpMap.size} converted files.\n`);

  // Step 2: Scan all source files and update references
  console.log('Updating references in src/...\n');
  let totalFiles = 0;
  let totalReplaced = 0;

  for await (const filePath of walk(SRC_DIR, TEXT_EXTENSIONS)) {
    let content = await readFile(filePath, 'utf-8');
    let replaced = 0;

    for (const [oldName, newName] of webpMap) {
      // Match both relative paths and absolute paths containing the filename
      // Escape special regex chars in filename
      const escapedOld = oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedOld, 'g');
      const matches = content.match(regex);
      if (matches) {
        content = content.replace(regex, newName);
        replaced += matches.length;
      }
    }

    if (replaced > 0) {
      await writeFile(filePath, content, 'utf-8');
      console.log(`  ${replaced} refs updated: ${filePath.replace(ROOT_DIR, '')}`);
      totalReplaced += replaced;
      totalFiles++;
    }
  }

  console.log(`\nDone! Updated ${totalReplaced} references in ${totalFiles} files.`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
