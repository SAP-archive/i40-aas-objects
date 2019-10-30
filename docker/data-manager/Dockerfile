FROM node:lts-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

WORKDIR /manager

COPY . /manager

RUN npm install

EXPOSE 4000

ENTRYPOINT [ "npm", "run", "dev" ]
