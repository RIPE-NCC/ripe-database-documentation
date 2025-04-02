# Build stage
FROM node:18 AS build

WORKDIR /src

COPY ./package*.json .npmrc ./

RUN npm install --legacy-peer-deps

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
