# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.12.0

# Base image setup
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

# Install production dependencies
FROM base AS deps
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

# Build application
FROM deps AS build
COPY app.json app.js webpack.config.js ./
COPY modules ./modules
COPY scripts ./scripts
RUN --mount=type=cache,target=/root/.npm npm ci
RUN npm run build

# Final runtime image
FROM base AS final
USER node
COPY --from=deps /usr/src/app/package.json /usr/src/app/package-lock.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules

EXPOSE 8080

# Default CMD; NODE_ENV is set via .env or passed at runtime
CMD npm start
