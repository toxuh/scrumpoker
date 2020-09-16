FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
EXPOSE 3011
CMD [ "node", "server.js" ]
