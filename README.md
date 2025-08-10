# GreenGuruAI — with Blaze

Next.js site for your cannabis AI assistant, now with an animated Blaze mascot.

## What’s included
- Animated Blaze next to the heading (file at `public/blaze.png`)
- Quick Action buttons above the chat
- Featured Picks section under the chat (swap in your affiliate links)
- Buy Me a Coffee button (config via env var)
- OpenAI-backed chat API

## Quick Start
1) `npm install`
2) Create `.env.local` with:
```
OPENAI_API_KEY=YOUR_KEY
SITE_NAME=GreenGuruAI
MODEL=gpt-3.5-turbo
NEXT_PUBLIC_BUYMEACOFFEE_URL=https://www.buymeacoffee.com/greenguruai
```
3) `npm run dev`

## Deploy (Vercel)
- Add the same env vars in **Project → Settings → Environment Variables** (Preview + Production).
- Deploy and you’re live.

## Change Featured Picks
Edit `pages/index.js`, update the `picks` array links to your affiliate URLs.
