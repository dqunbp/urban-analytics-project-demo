FROM node:carbon

ADD ../package.json /server/package.json
ADD . /server
WORKDIR /server

RUN npm install

EXPOSE 4000

CMD [ "npm", "serve" ]