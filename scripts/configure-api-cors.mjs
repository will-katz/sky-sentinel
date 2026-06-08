import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ApiGatewayV2Client,
  GetApiCommand,
  UpdateApiCommand,
} from '@aws-sdk/client-apigatewayv2';

const ROOT_DIR = fileURLToPath(new URL('..', import.meta.url));
const ENV_PATH = join(ROOT_DIR, '.env');

function loadEnv() {
  if (!existsSync(ENV_PATH)) return;

  for (const line of readFileSync(ENV_PATH, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
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

loadEnv();

const API_ID = process.env.CONTACT_API_ID ?? 'vzuzy5z5h0';
const REGION = process.env.AWS_REGION ?? 'us-east-1';
const BUCKET = process.env.S3_BUCKET ?? 'sky-sentinel-drone';

/** Public contact endpoint — allow any site origin (S3 URL, CloudFront, custom domain). */
const corsConfiguration = {
  AllowOrigins: ['*'],
  AllowMethods: ['POST', 'OPTIONS'],
  AllowHeaders: ['content-type'],
  MaxAge: 86400,
};

export async function configureContactApiCors() {
  const client = new ApiGatewayV2Client({ region: REGION });

  const current = await client.send(new GetApiCommand({ ApiId: API_ID }));
  const existing = current.CorsConfiguration ?? {};

  const sameConfig =
    JSON.stringify(existing.AllowOrigins ?? []) ===
      JSON.stringify(corsConfiguration.AllowOrigins) &&
    JSON.stringify(existing.AllowMethods ?? []) ===
      JSON.stringify(corsConfiguration.AllowMethods) &&
    JSON.stringify(existing.AllowHeaders ?? []) ===
      JSON.stringify(corsConfiguration.AllowHeaders);

  if (sameConfig) {
    console.log(`  API Gateway CORS already configured (${API_ID})`);
    return;
  }

  await client.send(
    new UpdateApiCommand({
      ApiId: API_ID,
      CorsConfiguration: corsConfiguration,
    }),
  );

  console.log(`  API Gateway CORS updated (${API_ID})`);
  console.log('    allow origins: *');
  console.log(
    `    site bucket: http://${BUCKET}.s3-website-${REGION}.amazonaws.com`,
  );
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  configureContactApiCors().catch((error) => {
    console.error('API CORS configuration failed:', error.message ?? error);
    process.exit(1);
  });
}
