import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = fileURLToPath(new URL('..', import.meta.url));

console.log('==> Building site');
execSync('npm run build', {
  cwd: ROOT_DIR,
  stdio: 'inherit',
  env: {
    ...process.env,
    VITE_SITE_URL: process.env.VITE_SITE_URL ?? 'https://skysentineldrone.com',
  },
});

console.log('==> Build complete (dist/)');
console.log('    Production deploys automatically on push to main via GitHub Actions → S3.');
