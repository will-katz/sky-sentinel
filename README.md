# Sky Sentinel

Marketing site for a drone inspection business.

```bash
npm install
npm run dev
```

Built with React, TypeScript, Vite, and Tailwind CSS.

## Hosting

The site is deployed to [GitHub Pages](https://pages.github.com/) on every push to `main`.

**One-time setup** (repo admin):

1. Open **Settings → Pages** and set **Source** to **GitHub Actions**.

Until the client’s DNS is updated, the live preview is:

**https://will-katz.github.io/sky-sentinel/**

When the client is ready to connect `skysentineldrone.com`:

1. In `.github/workflows/deploy.yml`, change the build env to:
   - `VITE_SITE_URL: https://skysentineldrone.com`
   - Remove `VITE_BASE_PATH` (custom domain is served from `/`)
2. Point DNS at GitHub Pages:
   - **Apex** (`skysentineldrone.com`): A records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **www** (optional): CNAME → `will-katz.github.io`
3. In **Settings → Pages**, enter the custom domain and enable **Enforce HTTPS** once DNS has propagated.

The contact form API remains on AWS Lambda/API Gateway (`npm run configure-api` updates CORS if needed).
