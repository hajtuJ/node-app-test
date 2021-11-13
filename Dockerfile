FROM node:14 as base
RUN npm install -g nodemon
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm install && mv /usr/src/app/node_modules /node_modules
COPY . /usr/src/app

FROM base as prod
ENV NODE_PATH=./build
RUN npm run build
