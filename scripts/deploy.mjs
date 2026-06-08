import { execSync } from 'node:child_process';
import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from '@aws-sdk/client-cloudfront';
import { configureContactApiCors } from './configure-api-cors.mjs';

const ROOT_DIR = fileURLToPath(new URL('..', import.meta.url));
const ENV_PATH = join(ROOT_DIR, '.env');
const CONTACT_EMAIL_KEYS = new Set(['CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL']);

function loadContactEmailsFromEnv() {
  if (!existsSync(ENV_PATH)) return;

  for (const line of readFileSync(ENV_PATH, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    if (!CONTACT_EMAIL_KEYS.has(key)) continue;

    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function loadDeployEnv() {
  if (!existsSync(ENV_PATH)) return;

  const parsed = dotenv.parse(readFileSync(ENV_PATH, 'utf8'));

  for (const [key, value] of Object.entries(parsed)) {
    if (CONTACT_EMAIL_KEYS.has(key)) continue;
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadContactEmailsFromEnv();
loadDeployEnv();
const DIST_DIR = join(ROOT_DIR, 'dist');

const BUCKET = process.env.S3_BUCKET ?? 'sky-sentinel-drone';
const REGION = process.env.AWS_REGION ?? 'us-east-1';
const CLOUDFRONT_DISTRIBUTION_ID = process.env.CLOUDFRONT_DISTRIBUTION_ID ?? '';

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
};

const s3 = new S3Client({ region: REGION });

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function contentType(filePath) {
  return CONTENT_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
}

function cacheControl(relativePath) {
  if (relativePath === 'index.html') {
    return 'max-age=0, no-cache, no-store, must-revalidate';
  }

  if (relativePath.startsWith('assets/')) {
    return 'public, max-age=31536000, immutable';
  }

  return 'public, max-age=86400';
}

async function uploadFile(filePath) {
  const key = relative(DIST_DIR, filePath).split('\\').join('/');
  const body = createReadStream(filePath);

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType(filePath),
      CacheControl: cacheControl(key),
    }),
  );

  console.log(`  uploaded ${key}`);
  return key;
}

async function listRemoteKeys() {
  const keys = [];
  let continuationToken;

  do {
    const response = await s3.send(
      new ListObjectsV2Command({
        Bucket: BUCKET,
        ContinuationToken: continuationToken,
      }),
    );

    for (const item of response.Contents ?? []) {
      if (item.Key) keys.push(item.Key);
    }

    continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
  } while (continuationToken);

  return keys;
}

async function deleteRemoteKeys(keys) {
  if (keys.length === 0) return;

  for (let i = 0; i < keys.length; i += 1000) {
    const batch = keys.slice(i, i + 1000);
    await s3.send(
      new DeleteObjectsCommand({
        Bucket: BUCKET,
        Delete: {
          Objects: batch.map((Key) => ({ Key })),
          Quiet: true,
        },
      }),
    );
  }

  console.log(`  removed ${keys.length} stale object(s)`);
}

async function invalidateCloudFront() {
  if (!CLOUDFRONT_DISTRIBUTION_ID) return;

  const cloudfront = new CloudFrontClient({ region: REGION });
  const response = await cloudfront.send(
    new CreateInvalidationCommand({
      DistributionId: CLOUDFRONT_DISTRIBUTION_ID,
      InvalidationBatch: {
        CallerReference: `${Date.now()}`,
        Paths: { Quantity: 1, Items: ['/*'] },
      },
    }),
  );

  console.log(`  invalidation ${response.Invalidation?.Id ?? 'started'}`);
}

async function main() {
  if (!process.env.AWS_ACCESS_KEY_ID && !process.env.AWS_PROFILE) {
    console.warn(
      'Warning: set AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY or AWS_PROFILE before deploying.',
    );
  }

  console.log('==> Configuring contact API CORS');
  await configureContactApiCors();

  console.log('==> Building site');
  execSync('npm run build', { cwd: ROOT_DIR, stdio: 'inherit' });

  try {
    await stat(DIST_DIR);
  } catch {
    throw new Error('dist/ folder missing after build');
  }

  console.log(`==> Uploading to s3://${BUCKET}/ (${REGION})`);
  const localFiles = await walk(DIST_DIR);
  const uploadedKeys = new Set();

  for (const filePath of localFiles) {
    uploadedKeys.add(await uploadFile(filePath));
  }

  const remoteKeys = await listRemoteKeys();
  const staleKeys = remoteKeys.filter((key) => !uploadedKeys.has(key));
  await deleteRemoteKeys(staleKeys);

  if (CLOUDFRONT_DISTRIBUTION_ID) {
    console.log('==> Invalidating CloudFront');
    await invalidateCloudFront();
  }

  console.log(`==> Deploy complete: s3://${BUCKET}/`);
  console.log(
    `    live preview: http://${BUCKET}.s3-website-${REGION}.amazonaws.com`,
  );
}

main().catch((error) => {
  console.error('Deploy failed:', error.message ?? error);
  process.exit(1);
});
