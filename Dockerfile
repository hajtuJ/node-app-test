FROM node:14 as base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

FROM base as prod
ENV NODE_PATH=./build
RUN npm run build
