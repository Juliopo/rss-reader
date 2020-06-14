FROM node:12

RUN mkdir /app
WORKDIR /app

COPY package*.json /app/

RUN yarn install

COPY . /app

EXPOSE 4000

CMD ["yarn", "start"]