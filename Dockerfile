FROM node:lts-alpine

WORKDIR /app
COPY package.json .
RUN npm i
RUN apk add --no-cache curl

COPY . .

CMD npm run start:docker