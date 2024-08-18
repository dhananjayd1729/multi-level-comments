FROM node:alpine
WORKDIR /usr/src/index 
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY ./src ./src
COPY ./.env ./
COPY ./src/config/database.js ./src/config/database.js
CMD ["npm", "start"]