FROM node:lts-alpine AS ts-builder

WORKDIR /manager

## TODO: REMOVE
RUN npm set registry http://0.0.0.0:4873

# Install required modules from package.json first to avoid frequent reinstallation
COPY package.json /manager
RUN npm install

# Add & compile sourcecode
COPY . /manager
RUN npm run clean \
    && npm run build

###################################
FROM node:lts-alpine

RUN adduser -D aasuser

WORKDIR /manager

## TODO: REMOVE
RUN npm set registry http://0.0.0.0:4873

COPY --from=ts-builder /manager/dist /manager/dist
COPY package.json /manager

RUN npm install --production

USER aasuser
EXPOSE 4000

ENTRYPOINT [ "npm", "start" ]