FROM node:15.6.0-alpine3.10

WORKDIR /usr/bin

COPY . .

ENV TELEGRAMKEY=(remove this text and the parentheses, replace them with your telegram key)

RUN npm install

CMD ["node","index.js"]