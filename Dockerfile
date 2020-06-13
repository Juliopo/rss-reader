FROM node:12

COPY . /usr/src/build
WORKDIR "/usr/src/build"

RUN yarn install
RUN yarn run test-build

EXPOSE 80
RUN yarn start