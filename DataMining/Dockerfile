# Base image https://hub.docker.com/u/rocker/
FROM rocker/r-base:latest

# Install the linux libraries needed for plumber
RUN apt-get update && apt-get install -y \
    libssl-dev \
    libxml2-dev \
    libcurl4-openssl-dev

# Create directory
RUN mkdir -p /usr/src/app

# Copy everything from the current directory into the container
COPY . /usr/src/app

# Specify working directory
WORKDIR /usr/src/app

# Open port 7190 to traffic
EXPOSE 7190

# Start the script
CMD ["Rscript","startup.R"]
