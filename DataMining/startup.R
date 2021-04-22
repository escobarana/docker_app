install.packages("plumber")

library(plumber)

pr <- plumb("plumber.R")
pr$run(port=7190, host="0.0.0.0")