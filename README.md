# Sky Sentinel

Marketing site for a drone inspection business.

```bash
npm install
npm run dev
```

Built with React, TypeScript, Vite, and Tailwind CSS.

## Hosting

The site deploys to **AWS S3** (with optional **CloudFront** invalidation) on every push to `main` via GitHub Actions.

### Required GitHub Actions secrets

| Secret | Purpose |
|--------|---------|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |

### Optional secrets

| Secret | Default | Purpose |
|--------|---------|---------|
| `AWS_REGION` | `us-east-1` | AWS region |
| `S3_BUCKET` | `sky-sentinel-drone` | Destination bucket |
| `CLOUDFRONT_DISTRIBUTION_ID` | _(none)_ | If set, invalidates `/*` after sync |
| `VITE_SITE_URL` | `https://skysentineldrone.com` | Canonical site URL baked into the build |

Local `.env` is not used. For local AWS CLI commands (`npm run configure-api`), use `aws configure` or export the same variables in your shell.

The contact form API remains on AWS Lambda/API Gateway. Lambda env vars (`CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`) stay in the Lambda configuration in AWS — not in this repo.
