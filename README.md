# AI Roadmap

Curated YouTube videos and articles for learning AI-assisted development — desktop-first UI.

## Run locally

```bash
npm install
cp .env.example .env
# Add your Clerk publishable key (see Authentication below)
npm run dev
```

Open **http://localhost:5173**

## Authentication

The app is gated behind **Clerk**. Users must sign in before using the roadmap.

1. Create an application at [Clerk Dashboard](https://dashboard.clerk.com).
2. Under **API Keys**, copy the **Publishable key**.
3. Set `VITE_CLERK_PUBLISHABLE_KEY` in `.env` (local) or in your **Vercel** project → **Settings** → **Environment Variables** (production).
4. In Clerk → **Paths**, set sign-in/sign-up URLs as needed; allow your local URL (`http://localhost:5173`) and production URL under **Allowed origins**.

If the key is missing, the app shows setup instructions instead of the roadmap.

## Production build

```bash
npm run build
npm run preview
```

Preview the built app at **http://localhost:4173** (default).

## Launch online (Vercel)

1. Push this repo to GitHub (if it isn’t already).
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → import the repo.
3. Vercel detects Vite; leave defaults (**Build Command:** `npm run build`, **Output:** `dist`).
4. Add **`VITE_CLERK_PUBLISHABLE_KEY`** in the project’s environment variables (same value as in `.env`). Step-by-step: [docs/vercel-clerk-env.md](./docs/vercel-clerk-env.md).
5. Deploy — you’ll get a URL like `your-project.vercel.app`.

**CLI alternative** (from the project root):

```bash
npx vercel
```

Follow the prompts; use `npx vercel --prod` for production.

## Launch on Netlify

- **Build command:** `npm run build`  
- **Publish directory:** `dist`

Or drag-and-drop the `dist` folder after running `npm run build`.

---

Built with React, TypeScript, Vite, and Tailwind CSS v4.
