/**
 * Re-compress only the UE5 video (fix upscale issue)
 */
import { execSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const ffmpegPath = ffmpegInstaller.path;
const __dirname = dirname(fileURLToPath(import.meta.url));
const src = join(__dirname, '..', 'public', '02游戏设计/警察局/UE5录屏.mp4');
const dst = join(__dirname, '..', '.vidtmp', '02游戏设计_警察局_UE5录屏.mp4');

const origMB = (statSync(src).size / 1024 / 1024).toFixed(1);
console.log(`Re-encoding UE5 (no upscale, original: ${origMB}MB)...`);

execSync(
  `"${ffmpegPath}" -y -i "${src}" -vf "scale='min(1280,iw)':-2" -r 24 -c:v libx264 -crf 28 -preset fast -an -movflags +faststart -pix_fmt yuv420p "${dst}"`,
  { stdio: 'inherit', timeout: 300000 }
);

const newMB = (statSync(dst).size / 1024 / 1024).toFixed(1);
console.log(`DONE: ${origMB}MB → ${newMB}MB`);
