FROM node:14-alpine
WORKDIR /api

COPY package*.json ./
RUN npm i && npm i -g @nestjs/cli
COPY . .
RUN npm run build

CMD node dist/main.js
