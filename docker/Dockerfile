# Build stage
FROM node:20.20.0 AS build

# Install required lib3 dependency for prebuilding mermaid .svg
RUN apt-get update && apt-get install -y \
    libnss3 \
    libxss1 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libasound2 \
    libx11-xcb1 \
    libdrm2 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /src

COPY ./package*.json .npmrc ./

RUN npm cache clean --force

RUN npm i

RUN git clone --depth 1 https://gitlab.ripe.net/swe-database-team/ripe-database-documentation-components.git docs-components && \
    mv docs-components/.vitepress . && mv docs-components/vpscripts .

COPY ./docs ./docs
# vuepress/last-updated plugin depends on .git
COPY ./.git ./.git

RUN npm run docs:build

# Final stage
FROM nginxinc/nginx-unprivileged:1.29.5-alpine

WORKDIR /srv/docs/

COPY ./docker/http.conf /etc/nginx/conf.d/default.conf

# TODO: [FM] temprorary file needed for healthcheck
RUN touch ./robots-prod.txt

COPY --from=build /src/.vitepress/dist ./

# required for dependency scanning
COPY --from=build /src/package-lock.json ../

EXPOSE 8080
