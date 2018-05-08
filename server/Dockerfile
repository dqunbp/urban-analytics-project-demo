FROM node:carbon

ADD . /server
WORKDIR /server

RUN npm install

EXPOSE 4000

CMD [ "npm", "serve" ]