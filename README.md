# GreenGuruAI

AI-powered cannabis information hub with an anonymous-friendly chatbot.

## Quick Start

1. **Install**: `npm install`
2. **Set env**: create `.env.local` with:
   ```
   OPENAI_API_KEY=YOUR_KEY_HERE
   SITE_NAME=GreenGuruAI
   BRAND_PRIMARY=#2C6E49
   ```
3. **Run local**: `npm run dev`
4. **Deploy on Vercel** and add the same environment variables in **Project Settings → Environment Variables**.

## Environment Variables

- `OPENAI_API_KEY` (required): your OpenAI key.
- `SITE_NAME` (optional): defaults to GreenGuruAI.
- `BRAND_PRIMARY` (optional): hex color for theming.
- `MODEL` (optional): override model (e.g., `gpt-4o`, `gpt-3.5-turbo`).

## Diagnostics

- `/api/ping` → should return `pong`
- `/api/diag` → shows if `OPENAI_API_KEY` is present

## Notes

- The chatbot is for **information only** and does not provide medical or legal advice.
- Anonymous mode: the site stores only ephemeral session state in the browser; no personal data is collected by default.
