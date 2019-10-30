FROM node:lts-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

WORKDIR /service

COPY . /service

RUN npm install

EXPOSE 4500

ENTRYPOINT [ "npm", "run", "dev" ]
