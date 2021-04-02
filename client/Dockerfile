# Using the latest LTS version 14 of node available from the Docker Hub
FROM node:12-alpine as build-step 

# Create app directory
RUN mkidir -p /app
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

EXPOSE 4200

CMD [ "npm", "run", "build" ]


FROM nginx:1.17.1-alpine
COPY --from=build-step app/dist/client /usr/share/nginx/html