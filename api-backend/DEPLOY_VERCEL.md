# Deploy CyberArmour API on Vercel

## 1) Create project on Vercel
- Import this folder as a new project: `website/api-backend`
- Framework preset: `Other`

## 2) Add environment variables in Vercel
- `SMTP_HOST`
- `SMTP_PORT` (usually `587`)
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM` (usually same as SMTP_USER)
- `CORS_ORIGIN=https://webdemo.cyberarmour.pk`

## 3) Deploy
- Click Deploy
- Copy your deployed URL, e.g. `https://cyberarmour-api.vercel.app`

## 4) Wire frontend and rebuild static site
In `website/.env.production` set:

`NEXT_PUBLIC_API_BASE_URL=https://your-vercel-project.vercel.app`

Then run:
- `npm run build`

Upload the generated static zip to cPanel.
