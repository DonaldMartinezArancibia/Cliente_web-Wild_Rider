FROM node:18 as build

WORKDIR /app
COPY ./package*.json ./

RUN npm i --legacy-peer-deps

COPY . .

CMD [ "npm","run","develop" ]