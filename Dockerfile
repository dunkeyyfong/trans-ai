FROM node:22-alpine AS base

FROM base AS dev
WORKDIR /app

ENV NODE_ENV=development
RUN apk add --no-cache openssl

FROM node:22-alpine AS production
ENV NPM_CONFIG_PRODUCTION=false

WORKDIR /app
COPY . .

ENV NODE_ENV=production
RUN apk add --no-cache openssl
RUN yarn run in-package
RUN yarn run build
RUN yarn run build:back

CMD ["yarn", "run", "prd:serve"]