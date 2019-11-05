FROM node:lts-alpine as ts-builder

WORKDIR /registry

## TODO: REMOVE
RUN npm set registry http://0.0.0.0:4873

# Install required modules from package.json first to avoid frequent reinstallation
COPY package.json /registry
RUN npm install

# Add & compile sourcecode
COPY . /registry
RUN npm run clean \
    && npm run build

###################################
FROM node:lts-alpine

RUN apk update && apk upgrade && \	
    apk add --no-cache bash postgresql postgresql-contrib netcat-openbsd

RUN adduser -D aasuser

WORKDIR /registry

## TODO: REMOVE
RUN npm set registry http://0.0.0.0:4873

COPY --from=ts-builder /registry/dist /registry/dist
COPY package.json /registry

COPY start.sh /registry
COPY prepareDB.sh /registry
COPY sql/* /registry/sql/

RUN npm install --production

USER aasuser
EXPOSE 4400

ENTRYPOINT [ "./start.sh" ]
