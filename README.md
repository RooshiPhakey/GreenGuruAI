# GreenGuruAI (Essentials)

Minimal Next.js site with a cannabis-themed chat assistant.
Includes:
- Quick Action buttons above the chat input
- Featured Picks section under the chat
- Chat API backed by OpenAI

## Quick Start
1) `npm install`
2) Create `.env.local` with:
```
OPENAI_API_KEY=YOUR_KEY
SITE_NAME=GreenGuruAI
MODEL=gpt-3.5-turbo
```
3) `npm run dev`

## Deploy (Vercel)
Add the same env vars in **Project → Settings → Environment Variables**:
- `OPENAI_API_KEY`
- `SITE_NAME` (optional)
- `MODEL` (optional; defaults to `gpt-3.5-turbo`)

## Notes
- Educational only; not medical or legal advice.

## Background options
- `NEXT_PUBLIC_BACKGROUND_MODE` (or `BACKGROUND_MODE`): `gradient` (default) or `rotate`
- `NEXT_PUBLIC_BACKGROUND_IMAGES` (or `BACKGROUND_IMAGES`): comma-separated list of image URLs (e.g., `/bg1.jpg,/bg2.jpg`)

To use rotating backgrounds, place files like `public/bg1.jpg`, `public/bg2.jpg` and set:
```
NEXT_PUBLIC_BACKGROUND_MODE=rotate
NEXT_PUBLIC_BACKGROUND_IMAGES=/bg1.jpg,/bg2.jpg,/bg3.jpg
```
