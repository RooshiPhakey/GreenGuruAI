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
