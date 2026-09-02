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

## Updating after the source document changes
Re-transcribe changed values into app.js (scorecard data) and index.html (narrative),
then rebuild the container.
