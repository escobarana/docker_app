install.packages("plumber")

library(plumber)

pr <- plumb("plumber.R")
pr$run(port=7190, host="156.35.163.172")
