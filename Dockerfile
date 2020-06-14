FROM node:12

COPY . /usr/src/build
WORKDIR "/usr/src/build"

RUN yarn install
RUN yarn run test-build

EXPOSE 8080
RUN yarn start