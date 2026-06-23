/**
 * Compress all videos in public/ with ffmpeg H.264
 * Output: compressed videos in public/.vidtmp/
 */
import { execSync } from 'node:child_process';
import { statSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const ffmpegPath = ffmpegInstaller.path;
const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');
const TMP_DIR = join(__dirname, '..', '.vidtmp');

const VIDEOS = [
  '02游戏设计/model/信箱模型视频旋转展示.mp4',
  '02游戏设计/警察局/UE5录屏.mp4',
  '02游戏设计/shining/21.12-shiningTwinmotion渲染短片.mp4',
  '02游戏设计/shining/25.04-SHINING_wandering2.0.MP4',
  '03AI辅助/sunshine/AI人才招聘游戏demo演示视频.mp4',
];

if (!existsSync(TMP_DIR)) mkdirSync(TMP_DIR);

for (const rel of VIDEOS) {
  const src = join(PUBLIC_DIR, rel);
  const name = rel.replace(/[/\\]/g, '_');
  const dst = join(TMP_DIR, name);
  const origMB = (statSync(src).size / 1024 / 1024).toFixed(1);
  console.log(`Encoding: ${rel} (${origMB}MB)...`);
  try {
    execSync(
      `"${ffmpegPath}" -y -i "${src}" -vf "scale='min(1280,iw)':-2" -r 24 -c:v libx264 -crf 30 -preset fast -an -movflags +faststart -pix_fmt yuv420p "${dst}"`,
      { stdio: 'pipe', timeout: 600000 }
    );
    const newMB = (statSync(dst).size / 1024 / 1024).toFixed(1);
    console.log(`  DONE: ${origMB}MB → ${newMB}MB  (${dst})`);
  } catch (e) {
    console.log(`  ERROR: ${e.message.substring(0, 200)}`);
  }
}
console.log('\nAll done. Compressed files in .vidtmp/');
