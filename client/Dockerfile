# Using the latest LTS version 14 of node available from the Docker Hub
FROM node:14

# Create app directory
# RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm cache clean
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /app

EXPOSE 4200

# RUN npm run build

# FROM nginx:1.17.1-alpine
# COPY --from=build-step app/dist/client /usr/share/nginx/html

# start app
CMD ["npm", "start" , "--host", "0.0.0.0"]