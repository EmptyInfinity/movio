FROM node:15.8.0-alpine

RUN mkdir -p /app
WORKDIR /app

EXPOSE 3033
EXPOSE 4044

COPY package.json /app
COPY yarn.lock /app

RUN yarn global add foreman
RUN yarn install

COPY . /app

CMD [ "nf", "run" ]