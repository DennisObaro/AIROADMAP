# Add Clerk publishable key on Vercel

The variable name **must** match Vite’s prefix: `VITE_CLERK_PUBLISHABLE_KEY`.

## Option A — Dashboard (simplest)

1. Open [Vercel](https://vercel.com) → your **project** → **Settings** → **Environment Variables**.
2. **Key:** `VITE_CLERK_PUBLISHABLE_KEY`
3. **Value:** paste the **Publishable key** from [Clerk Dashboard](https://dashboard.clerk.com) → **API Keys** (same value as in local `.env`).
4. Enable for **Production**, **Preview**, and **Development** (or at least Production + Preview).
5. **Redeploy** the latest deployment (Deployments → … → Redeploy) so the new variable is applied to the build.

## Option B — Vercel CLI (from this repo)

Requires [Vercel CLI](https://vercel.com/docs/cli) and a linked project.

```bash
# once per machine / repo
npx vercel link

# add for each environment (paste key when prompted, or use script below)
npx vercel env add VITE_CLERK_PUBLISHABLE_KEY production
npx vercel env add VITE_CLERK_PUBLISHABLE_KEY preview
npx vercel env add VITE_CLERK_PUBLISHABLE_KEY development
```

Or run the helper script (reads from `.env`):

```bash
./scripts/push-clerk-env-to-vercel.sh
```

---

**Security:** The publishable key is meant to appear in the browser, but don’t post it in public repos or chats if you can avoid it. If it was exposed somewhere untrusted, you can rotate keys in the Clerk dashboard.
