# Build stage
FROM node:16 AS build

WORKDIR /src

COPY ./package*.json .npmrc ./

RUN npm install --legacy-peer-deps

COPY ./docs ./docs

RUN npm run docs:build

# Final stage
FROM nginx:alpine

# Clean the default nginx html directory
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /src/builds /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

EXPOSE 80
