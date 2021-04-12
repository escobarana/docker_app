# Using the latest LTS version 14 of node available from the Docker Hub (alpine generates a lower size image)
FROM node:14-alpine 

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Install dependecies
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD [ "npm", "start" ]
