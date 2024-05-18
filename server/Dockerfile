FROM node:21-slim

WORKDIR /usr/src/app

COPY  ./package.json ./
COPY  ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5001

CMD [ "index.js" ]