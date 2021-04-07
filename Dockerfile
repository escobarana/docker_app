# Using the latest LTS version 14 of node available from the Docker Hub
FROM node:carbon as builder

# Create a directory where our app will be placed
# RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

# Install dependecies
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Get all the code needed to run the app
COPY . /app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD [ "npm", "start" ]

#FROM node:carbon-alpine
#WORKDIR /app

# Stage 2 build for creating smaller image
#COPY --from=builder /app .
