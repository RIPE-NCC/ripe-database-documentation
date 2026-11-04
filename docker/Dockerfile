# VitePress configuration and build scripts, maintained in a separate repository
FROM node:24.21.0 AS components

RUN git clone --depth 1 https://gitlab.ripe.net/swe-database-team/ripe-database-documentation-components.git /components

# Build stage
FROM node:24.21.0 AS build

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

COPY --from=components /components/.vitepress ./.vitepress
COPY --from=components /components/vpscripts ./vpscripts

COPY ./docs ./docs
# vuepress/last-updated plugin depends on .git
COPY ./.git ./.git

RUN npm run docs:build

# Inputs for the CI security scans, exported with `--target scan-sources --output type=local`
FROM scratch AS scan-sources

# dependency scanning
COPY --from=build /src/package-lock.json /
# SAST, .vitepress is renamed so the analyzer does not skip it as a hidden directory
COPY --from=components /components/.vitepress /docs-components/vitepress
COPY --from=components /components/vpscripts /docs-components/vpscripts

# Final stage
FROM nginx/nginx-unprivileged:1.31.8-alpine

WORKDIR /srv/docs/

COPY ./docker/http.conf /etc/nginx/conf.d/default.conf

# TODO: [FM] temprorary file needed for healthcheck
RUN touch ./robots-prod.txt

COPY --from=build /src/.vitepress/dist ./

EXPOSE 8080
