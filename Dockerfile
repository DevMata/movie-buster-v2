FROM node:12.14

WORKDIR /usr/src/app

COPY . .

RUN npm install