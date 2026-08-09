# Sky Sentinel

Marketing site for Sky Sentinel drone inspection services (home + `/team` bios).

```bash
npm install
npm run dev
```

Built with React, TypeScript, Vite, and Tailwind CSS.

| Script | Purpose |
|--------|---------|
| `npm run dev` | Local Vite server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run configure-api` | Update contact API CORS (needs AWS CLI creds) |

## Hosting

Pushes to `main` deploy via GitHub Actions:

1. Build the site
2. Sync `dist/` to **S3**
3. Invalidate **CloudFront** `/*` when `CLOUDFRONT_DISTRIBUTION_ID` is set

The CloudFront origin is the S3 bucket. A custom domain (e.g. `skysentineldrone.com`) is optional and needs DNS + an ACM certificate when you’re ready.

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
| `CLOUDFRONT_DISTRIBUTION_ID` | _(none)_ | If set, invalidates `/*` after sync (recommended when using CloudFront) |
| `VITE_SITE_URL` | `https://skysentineldrone.com` | Canonical site URL baked into the build |

Local `.env` is not used. For local AWS CLI commands (`npm run configure-api`), use `aws configure` or export the same variables in your shell.

The contact form posts to AWS Lambda / API Gateway. Lambda env vars (`CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`) stay in the Lambda configuration in AWS — not in this repo.

## Assets

Static files live in `public/`. Team portraits (when ready) go in `public/team/` as:

- `charles-s.jpg`
- `george-awad.jpg`
- `david-mcdevitt.jpg`
