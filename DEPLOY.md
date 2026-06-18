# Deployment — River Global

Static Vite/React site. `deploy.sh` builds it and serves `dist/` as an **isolated
PM2 process on a dedicated port**. It does **not** touch any other website on the
droplet — no shared nginx edits, no restarting other PM2 apps.

---

## Every deploy (the routine you asked for)

```bash
cd /var/www/river-global      # wherever you cloned the repo
git pull                      # get latest code from GitHub
bash deploy.sh                # install deps -> build -> (re)serve
```

That's it. The site is rebuilt and re-served on its port (default `4173`).

To use a different port or process name without editing the script:

```bash
PORT=5005 APP_NAME=river bash deploy.sh
```

---

## One-time server setup

### 1. Clone the repo (first time only)
```bash
cd /var/www
git clone https://github.com/<you>/<repo>.git river-global
cd river-global
bash deploy.sh
```

### 2. Keep it alive across reboots (run once)
```bash
pm2 startup        # prints a command — copy/paste & run it once
pm2 save
```

### 3. Point your domain at it (nginx reverse proxy)

This is the **only** step involving nginx. You **add a new file** — you do not edit
any existing site's config, so the other websites are unaffected.

First point DNS at the droplet — at your registrar add two A records:

| Type | Host | Value |
|------|------|----------------|
| A | `@`   | `139.59.39.65` |
| A | `www` | `139.59.39.65` |

Verify it resolves: `dig +short riverglobal.com.au` → should print `139.59.39.65`.

Then create `/etc/nginx/sites-available/river-global`:

```nginx
server {
    listen 80;
    server_name riverglobal.com.au www.riverglobal.com.au;

    location / {
        proxy_pass http://127.0.0.1:4173;     # must match PORT in deploy.sh
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable it and reload (reload re-reads all configs but changes nothing about the
existing sites):

```bash
sudo ln -s /etc/nginx/sites-available/river-global /etc/nginx/sites-enabled/
sudo nginx -t          # verify config is valid
sudo systemctl reload nginx
```

### 4. HTTPS / SSL certificate (free, auto-renewing)
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d riverglobal.com.au -d www.riverglobal.com.au
```
Choose **redirect HTTP → HTTPS** when prompted. Certbot edits the nginx block to
add `listen 443 ssl` and sets up auto-renewal. Test renewal with:
`sudo certbot renew --dry-run`.

Make sure ports 80/443 are open: `sudo ufw allow 'Nginx Full'` (and in the DO
cloud firewall if you use one).

---

## Why this is safe for the other sites

- **Dedicated port** (`4173`) — pick any free port; doesn't collide with others.
- **Named PM2 app** (`river-global`) — `deploy.sh` only deletes/restarts *this* name.
  `pm2 save` persists the whole list, so the other apps are kept, never removed.
- **No global nginx edits** — you only add one new server-block file for your domain.

## Useful commands

```bash
pm2 list                  # see all sites (yours + others)
pm2 logs river-global     # tail this site's logs
pm2 restart river-global  # restart just this site
```
