# start from the rocker/tidyverse image
FROM rocker/tidyverse

# install the linux libraries needed for plumber
RUN apt-get update && apt-get install -y \
    libssl-dev \
    libcurl4-gnutls-dev

# Create directory
RUN mkdir -p /usr/src/app

# copy everything from the current directory into the container
COPY . /usr/src/app
WORKDIR /usr/src/app

# open port 7190 to traffic
EXPOSE 7190

RUN R -e "install.packages(c('rjson', 'jsonlite', 'tm', 'tidyr', 'widyr', 'tidytext', 'dplyr', 'SnowballC', 'stringr'), repos='https://cloud.r-project.org/')"
RUN R -e "install.packages('textclean', repos='https://cloud.r-project.org/')"
RUN R -e "install.packages('textcat', repos = 'http://cran.us.r-project.org')"
RUN R -e "install.packages('plumber', repos = 'http://cran.us.r-project.org', dependencies=TRUE)"

# ENTRYPOINT ["R", "-e", "pr <- plumber::plumb('plumber.R'); pr$run(host='0.0.0.0', port=7190, swagger=TRUE)"]

CMD ["Rscript","startup.R"]
