#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ ! -f .env ]]; then
  echo "Missing .env — copy .env.example to .env and set VITE_CLERK_PUBLISHABLE_KEY"
  exit 1
fi

# shellcheck disable=SC1091
set -a
source .env
set +a

if [[ -z "${VITE_CLERK_PUBLISHABLE_KEY:-}" ]]; then
  echo "VITE_CLERK_PUBLISHABLE_KEY is empty in .env"
  exit 1
fi

if ! command -v npx >/dev/null 2>&1; then
  echo "npx not found"
  exit 1
fi

for env in production preview development; do
  echo "Adding VITE_CLERK_PUBLISHABLE_KEY to Vercel ($env)..."
  printf '%s' "$VITE_CLERK_PUBLISHABLE_KEY" | npx vercel env add VITE_CLERK_PUBLISHABLE_KEY "$env" || true
done

echo ""
echo "Done. If a value already existed, remove the old one in Vercel → Settings → Environment Variables, then re-run this script or add manually."
echo "Redeploy on Vercel so the build picks up the variable."
