FROM node:12.14.0-stretch-slim

RUN mkdir app
WORKDIR /app

COPY . .
COPY ./package-lock.json ./package-lock.json
COPY ./package.json ./package.json

RUN npm install

CMD [ "npm", "run", "start" ]

EXPOSE 3000
