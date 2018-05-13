FROM node:carbon
WORKDIR /usr/src/app
COPY server/package*.json ./
RUN npm install -qy
COPY server/ ./
COPY public/ ./public
EXPOSE 8080

CMD [ "npm", "start" ]