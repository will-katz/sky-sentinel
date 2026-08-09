import { fileURLToPath } from 'node:url';
import {
  ApiGatewayV2Client,
  GetApiCommand,
  UpdateApiCommand,
} from '@aws-sdk/client-apigatewayv2';

const API_ID = process.env.CONTACT_API_ID ?? 'vzuzy5z5h0';
const REGION = process.env.AWS_REGION ?? 'us-east-1';
const SITE_URL = process.env.VITE_SITE_URL ?? 'https://skysentineldrone.com';

/** Public contact endpoint — allow any site origin (CloudFront, custom domain). */
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
  console.log(`    site url: ${SITE_URL}`);
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  configureContactApiCors().catch((error) => {
    console.error('API CORS configuration failed:', error.message ?? error);
    process.exit(1);
  });
}
