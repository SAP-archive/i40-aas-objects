FROM node:lts-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

WORKDIR /service

COPY . /service

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "dev" ]
