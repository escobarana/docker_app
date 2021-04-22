# Start from the rocker/r-ver:3.5.0 image
FROM rocker/r-ver:3.5.0

# RUN apt install r-base-dev

# Install the linux libraries needed for plumber
RUN apt-get update && apt-get install -y \
    libssl-dev \
    libcurl4-gnutls-dev \
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
