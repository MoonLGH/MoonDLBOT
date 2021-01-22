FROM node:15.6.0-alpine3.10

WORKDIR /usr/bin

COPY . .

RUN npm install

CMD ["node","index.js"]