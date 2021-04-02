# start from the rocker/r-ver:3.5.0 image
FROM rocker/r-ver:3.5.0

# install the linux libraries needed for plumber
RUN apt-get update -qq && apt-get install -y \
      libssl-dev \
      libcurl4-gnutls-dev

# install plumber
RUN R -e "install.packages('plumber')"

# copy everything from the current directory into the container
COPY . /app

# open port 7190 to traffic
EXPOSE 7190

# when the container starts, start the plumber.R script
ENTRYPOINT ["Rscript", "startup.R"]