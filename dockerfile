FROM node:23-alpine as build
WORKDIR /server
COPY package*.json ./

RUN npm install --silent
COPY . .

EXPOSE 4000
CMD ["npm", "start"]
