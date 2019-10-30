FROM node:lts-alpine	

RUN apk update && apk upgrade && \	
    apk add --no-cache bash git openssh postgresql postgresql-contrib netcat-openbsd	

WORKDIR /registry	

COPY . /registry	

RUN npm install	

EXPOSE 4400	

ENTRYPOINT [ "./start.sh" ]
