FROM node:lts-alpine

WORKDIR .
COPY package*.json ./
RUN npm install --global @gridsome/cli
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "gridsome", "develop" ]
