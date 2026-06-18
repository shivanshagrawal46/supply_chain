#!/usr/bin/env bash
#
# deploy.sh — build & (re)serve River Global as an ISOLATED PM2 process.
#
# Safe for a multi-site droplet: this script only ever touches its OWN
# PM2 app (named below) and its OWN port. It never edits nginx, never
# removes other PM2 apps, and never restarts other websites.
#
# Usage on the server:
#   git pull            # get the latest code
#   bash deploy.sh      # build + (re)start this site
#
# Override defaults without editing the file:
#   PORT=5005 APP_NAME=river bash deploy.sh
#
set -euo pipefail

# ─────────── Config (env vars win over these defaults) ───────────
APP_NAME="${APP_NAME:-river-global}"   # unique PM2 name — must not match another site
PORT="${PORT:-4173}"                   # dedicated port for THIS site only (nginx proxies to it)
BUILD_DIR="dist"                       # Vite output directory
# ─────────────────────────────────────────────────────────────────

# Always operate from the repo root (where this script lives)
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

log() { printf '\n\033[1;36m▶ %s\033[0m\n' "$*"; }

log "Deploying '$APP_NAME' on port $PORT"

# 1) Sanity: Node must be available
command -v node >/dev/null 2>&1 || { echo "❌ node not found in PATH"; exit 1; }
echo "   node $(node -v) · npm $(npm -v)"

# 2) Install dependencies (reproducible when a lockfile is present)
log "Installing dependencies"
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

# 3) Build the production bundle -> ./dist
log "Building production bundle"
npm run build
[ -d "$BUILD_DIR" ] || { echo "❌ build did not produce '$BUILD_DIR/'"; exit 1; }

# 4) Ensure pm2 exists (shared process manager; reused if other sites already use it)
if ! command -v pm2 >/dev/null 2>&1; then
  log "pm2 not found — installing globally"
  npm install -g pm2 || sudo npm install -g pm2
fi

# 5) (Re)start ONLY this app. `pm2 delete` is scoped to APP_NAME, so every
#    other PM2 process on the droplet is left completely untouched.
log "Restarting PM2 app '$APP_NAME'"
pm2 delete "$APP_NAME" >/dev/null 2>&1 || true
pm2 serve "$BUILD_DIR" "$PORT" --name "$APP_NAME" --spa

# 6) Persist the current process list so it survives reboots.
#    This saves ALL running pm2 apps (yours + the others) — it removes nothing.
pm2 save

log "Done ✔  '$APP_NAME' is serving ./$BUILD_DIR on http://127.0.0.1:$PORT"
echo "   Next: point your domain's nginx server block at this port (see DEPLOY.md)."
