# Using the latest LTS version 14 of node available from the Docker Hub
FROM node:12-alpine as build-step 

RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /app

RUN npm cache clean
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /app

EXPOSE 3000

CMD [ "npm", "start" ]