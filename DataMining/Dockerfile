# start from the rocker/r-ver:3.6.1 image
FROM rocker/r-ver:3.6.1

WORKDIR /app

# install the linux libraries needed for plumber
RUN apt-get update && apt-get install -y --no-install-recommends \
  git-core \
  liblapack-dev \
  libpq-dev \
  libssl-dev \
  libcurl4-gnutls-dev \
  curl \
  libsodium-dev \
  libxml2-dev

# copy everything from the current directory into the container
COPY . .

RUN R -e "install.packages(c('Rcpp','tidyverse','plumber', 'rjson', 'jsonlite', 'tm', 'tidyr', 'widyr', 'tidytext', 'dplyr', 'SnowballC', 'stringr', 'textclean'), \
repos = 'http://cran.us.r-project.org')"

# ENTRYPOINT ["R", "-e", "pr <- plumber::plumb('plumber.R'); pr$run(host='0.0.0.0', port=7190, swagger=TRUE)"]
COPY . /app
# open port 7190 to traffic
EXPOSE 7190

CMD ["Rscript","startup.R"]
# RUN R -e "install.packages('plumber')"
