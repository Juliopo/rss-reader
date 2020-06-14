FROM node:12

RUN mkdir /app
WORKDIR /app

COPY package*.json /app/

RUN rm -rf node_modules && yarn install

COPY . /app

EXPOSE 8080

RUN yarn start