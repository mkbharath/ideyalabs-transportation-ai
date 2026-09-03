# ideyaLabs Transportation AI - Priority Roadmap (static site)

A self-contained, static presentation of the Priority Assessment & Implementation
Roadmap. No backend, no database, no build step - just HTML, CSS, and a
small vanilla-JS file. Every number is transcribed from the source document; nothing
is invented, and illustrative figures are labelled as the document labels them.

## Files
- index.html - the one-page site
- styles.css - design system (ideyaLabs blue/orange, light/dark toggle)
- app.js - theme toggle + sortable 18-product scorecard
- assets/ideyalabs-logo.png - logo
- Dockerfile, nginx.conf, docker-compose.yml - on-prem deployment

## View locally (no tools)
Open index.html in any browser. That is it.

## Run locally with a tiny web server (optional)
    cd roadmap-site
    python3 -m http.server 8088
    # then open http://localhost:8088

## Deploy on your on-prem server (recommended for sharing)

### Option A - Compose (one command)
    cd roadmap-site
    docker compose up -d --build
    # serves on http://SERVER-IP:8088
    # clean port-80 link:  PORT=80 docker compose up -d --build
Stop with: docker compose down

### Option B - manual container
    cd roadmap-site
    docker build -t ideyalabs-roadmap:latest .
    docker run -d --name ideyalabs-roadmap -p 8088:80 --restart unless-stopped ideyalabs-roadmap:latest

### Option C - Copy onto an existing web server
Copy index.html, styles.css, app.js, and assets/ into your web root
(e.g. /var/www/html for Apache/nginx, or an IIS site folder). No further config needed.

## Sharing with the CEO
Once running on the on-prem server, share the URL:
    http://SERVER-HOSTNAME:8088
For a clean link on port 80 use the PORT=80 command above, then http://SERVER-HOSTNAME.
If the server sits behind your reverse proxy / TLS, point a hostname at the container
and it serves over HTTPS with no changes to the site.

## Custom domain: iltrans-roadmap.ideyalabs.com

The server is on a private IP (172.16.6.199), so this is an INTERNAL-only
hostname. Three pieces:

1) DNS (internal) - resolve the hostname to the server IP
   The name must be served by your INTERNAL DNS (public DNS cannot point at a
   private IP). Choose one:
   - Add an A record to your internal ideyalabs.com zone:
         iltrans-roadmap  A  172.16.6.199
   - Or ask IT to add that A record.
   - Quick test without DNS - add to each viewer machine's hosts file:
         172.16.6.199   iltrans-roadmap.ideyalabs.com
       (macOS/Linux: /etc/hosts   Windows: C:\Windows\System32\drivers\etc\hosts)

2) Port 80 (so the URL needs no ":8088")
   The container's nginx already answers on port 80 and now accepts the
   hostname (server_name iltrans-roadmap.ideyalabs.com). Bind host port 80:
         cd ~/ideyalabs-transportation-ai
         git pull
         PORT=80 docker compose up -d --build
   If port 80 is busy ("address already in use"), find the owner first:
         sudo lsof -i :80          # or: sudo ss -ltnp | grep :80
   - If it's another docker container, stop it or run this app behind the
     existing reverse proxy (forward iltrans-roadmap.ideyalabs.com -> 127.0.0.1:8088).
   - If nothing critical owns it, free it and use PORT=80 above.
   Fallback: keep 8088 and use http://iltrans-roadmap.ideyalabs.com:8088

3) HTTPS (optional, internal)
   Public Let's Encrypt (HTTP validation) will not work for a private host.
   Options: an internal CA-signed cert, a self-signed cert, or DNS-01
   validation. Start HTTP-only; add TLS later via your reverse proxy.

Verify once DNS + port are set:
      curl -I http://iltrans-roadmap.ideyalabs.com
   Expect: HTTP/1.1 200 OK

## Updating after the source document changes
Re-transcribe changed values into app.js (scorecard data) and index.html (narrative),
then rebuild the container.
