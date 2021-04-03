# Using the latest LTS version 14 of node available from the Docker Hub
FROM node:carbon as builder

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
COPY . .

FROM node:carbon-alpine
WORKDIR /app

# Stage 2 build for creating smaller image
COPY --from=builder /app .

EXPOSE 3000

CMD [ "npm", "start" ]