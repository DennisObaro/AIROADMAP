# AI Roadmap

Curated YouTube videos and articles for learning AI-assisted development — desktop-first UI.

## Run locally

```bash
npm install
npm run dev
```

Open **http://localhost:5173**

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
4. Deploy — you’ll get a URL like `your-project.vercel.app`.

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
