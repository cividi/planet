FROM node:lts-alpine
RUN apk update
RUN apk add util-linux 

WORKDIR .
COPY package*.json ./
RUN npm install --global @gridsome/cli
RUN npm install
COPY . .
EXPOSE 8555
CMD [ "gridsome", "serve", "-p", "8555", "-h", "0.0.0.0" ]
