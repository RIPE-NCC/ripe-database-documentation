# Build stage
FROM node:20 AS build

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

RUN npm install

COPY ./docs ./docs

# vuepress/last-updated plugin depends on .git
COPY ./.git ./.git

COPY ./.vitepress ./.vitepress

COPY ./vpscripts ./vpscripts

COPY ./docs/public/imgs ./imgs

RUN npm run docs:build

# Final stage
FROM nginx:alpine

# Clean the default nginx html directory
RUN rm -rf /usr/share/nginx/html/*

COPY http.conf /etc/nginx/conf.d/default.conf

COPY --from=build /src/.vitepress/dist /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

EXPOSE 80
