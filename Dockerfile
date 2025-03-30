FROM sitespeedio/node:ubuntu-22-04-nodejs-20.17.0.1 AS base

FROM base AS dev
WORKDIR /app

ENV NODE_ENV=development
RUN apt-get update && apt-get install -y openssl
RUN apt update && apt install -y mysql-client
RUN apt update && apt install file -y
# RUN apt update && apt install ffmpeg -y
# RUN apt update && apt install python3 -y
# RUN apt update && apt install python3-pip -y
# RUN pip3 install yt-dlp pysrt openai load-dotenv
RUN npm install -g yarn

FROM node:22-alpine AS production
ENV NPM_CONFIG_PRODUCTION=false

WORKDIR /app
COPY . .

ENV NODE_ENV=production
RUN apt-get update && apt-get install -y openssl
RUN yarn run in-package
RUN yarn run build
RUN yarn run build:back

CMD ["yarn", "run", "prd:serve"]