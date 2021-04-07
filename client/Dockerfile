# Using the latest LTS version 14 of node available from the Docker Hub
FROM node:14 as node-angular-cli

# Create app directory
# RUN mkdir -p /app
WORKDIR /app

# Bundle app source
COPY . /app

RUN npm install

RUN npm build

EXPOSE 4200
ENV PORT 4200

# start app
CMD ["npm", "start"]
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./

# RUN npm cache clean

# If you are building your code for production
# RUN npm ci --only=production

# RUN npm run build

# FROM nginx:1.17.1-alpine
# COPY --from=build-step app/dist/client /usr/share/nginx/html