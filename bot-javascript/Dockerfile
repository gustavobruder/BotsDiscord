# based on: https://www.cloudbees.com/blog/using-docker-compose-for-nodejs-development

# build environment
FROM node:12.16.0-alpine

WORKDIR /usr/app

COPY package.json .

RUN npm install --quiet

COPY . .