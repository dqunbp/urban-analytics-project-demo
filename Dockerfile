FROM node:carbon
ADD . /app
WORKDIR /app
RUN npm install -qy
EXPOSE 5000

CMD [ "npm", "start" ]