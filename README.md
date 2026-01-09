# HackIt

## Deployment (Coolify)

This repository is configured to run on Coolify by cloning the GitHub repo directly.

### Requirements
- Node.js 18 (Docker image handles this)
- Next.js 14 with `output: 'standalone'`

### Environment Variables
Set these in Coolify → Application → Environment variables:

- `NEXT_PUBLIC_DISCORD_INVITE_URL` (optional): Public invite URL for client-side member counts
- `DISCORD_BOT_TOKEN` (optional): Discord Bot token for `/api/discord-members`
- `DISCORD_SERVER_ID` (optional): Discord Guild ID for `/api/discord-members`
- `PORT` (optional): defaults to `3000`

### Build & Run
Coolify will detect the `Dockerfile` and build using multi-stage builds:

1. Install dependencies (`npm ci`)
2. Build Next.js (`npm run build`)
3. Run standalone server (`node server.js`)

The app listens on port `3000` by default.

### Health Check (optional)
You can set a health check to `/` (200) or any public page like `/news`.

## Local Development

```bash
npm ci
npm run dev
```

## Scripts

- `dev`: Start Next.js dev server
- `build`: Build production bundle
- `start`: Start production server
