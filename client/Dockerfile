# Stage 1
# Using the latest LTS version 14 of node available from the Docker Hub
FROM node:14-alpine as node-angular-cli

# Create app directory
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Get all the code needed to run the app
COPY . .

# Run the angular in product
RUN npm run build

# EXPOSE 4200
# ENV PORT 4200

# Stage 2
FROM nginx:1.17.1-alpine

#copy dist content to html nginx folder, config nginx to point in index.html
COPY --from=node-angular-cli /usr/src/app/dist/client /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
