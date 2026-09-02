# ideyaLabs Transportation AI Roadmap — static site
# Serves the site with nginx. No build step, no runtime dependencies.
FROM nginx:1.27-alpine

# Site files
COPY index.html detail.html market.html client.html styles.css app.js data.js detail.js market-data.js market.js client.js landscape-data.js directory-data.js intersection-data.js intersection.js intersection.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

# Custom nginx config (gzip, caching, security headers)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1
