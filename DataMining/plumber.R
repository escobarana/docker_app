#Para que no salte OutOfMemoryError
options(java.parameters = c("-XX:+UseConcMarkSweepGC", "-Xmx8192m"))

install.packages("rjson")
install.packages("jsonlite")
install.packages("tm")
install.packages("tidyr")
install.packages("widyr")
install.packages("tidytext")
install.packages("dplyr")
install.packages("SnowballC")
install.packages("stringr")
install.packages("textclean")
install.packages("tidyverse")
install.packages("textcat")

library(plumber)
library(rjson)
library(jsonlite)
library(tidyverse)
library(tm)
library(tidyr)
library(widyr)
library(tidytext)
library(dplyr)
library(SnowballC)
library(stringr)
library(textclean)
library("textcat")


#* @apiTitle Data Mining apps

#' @filter cors
cors <- function(req, res) {
  
  res$setHeader("Access-Control-Allow-Origin", "*")
  
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$setHeader("Access-Control-Allow-Methods","*")
    res$setHeader("Access-Control-Allow-Headers", req$HTTP_ACCESS_CONTROL_REQUEST_HEADERS)
    res$status <- 200 
    return(list())
  } else {
    plumber::forward()
  }
  
}


#* Data Mining of apps JSON
#* @param url url where apps json are posted
#* @get /dataMining
#* @json
function(url=""){
  
  print(url)
  
  start.time <- Sys.time()
  
  ################## Importo el json ################## 

  json_file <-  fromJSON(url)

  ################## Creo tidy data frame para description ################## 
  
  json_file <- lapply(json_file, function(x) {
    x[sapply(x, is.null)] <- NA
    unlist(x)
  })
  # do.call("rbind", json_file)
  
  app_desc <- tibble(appId = json_file$appId,desc = json_file$description)
  tidy_data_frame <- app_desc
  
  ################## Limpio la descripcion ################## 
  
  app_desc <- app_desc[complete.cases(app_desc$appId), ]
  not_english_apps <- app_desc[!textcat(app_desc$desc) == "english",]
  app_desc <- app_desc[textcat(app_desc$desc) == "english",]
  
  app_desc$desc <- as.character(app_desc$desc)
  app_desc$desc <- tm::removeNumbers(app_desc$desc)
  app_desc$desc <- tm::removeWords(x = app_desc$desc, c(stopwords(kind = "SMART"),"app", "application"))
  app_desc$desc <- str_replace_all(app_desc$desc, pattern = "\\'", " ")
  app_desc$desc <- gsub("_", " ", app_desc$desc)
  app_desc$desc <- str_replace_all(app_desc$desc, pattern = "[[:punct:]]", " ")
  app_desc$desc <- tm::removeWords(x = app_desc$desc, stopwords(kind = "SMART"))
  app_desc$desc <- gsub("\\b\\w{1,2}\\s","", app_desc$desc)
  
  for(r in 1:nrow(app_desc)){
    app_desc[r,2] <- replace_url(app_desc[r,2])
  }
  
  desc_limpio <- app_desc
  
  ################## Creo los tidy text ################## 
  
  print("Creo los tidy text")
  
  ## 2grams
  app_desc_bigrams <- app_desc %>% 
    unnest_tokens(word, desc, token = "ngrams", n=2) %>%
    anti_join(stop_words)
  
  app_desc_bigrams <- app_desc_bigrams %>%
    separate(word, c("word1", "word2"), sep = " ") %>%
    mutate(word1_stem = wordStem(word1)) %>%
    mutate(word2_stem = wordStem(word2))
  
  app_desc_bigrams <- app_desc_bigrams %>% 
    mutate(word_stem = paste(word1_stem, word2_stem, sep = " "))
  
  drops <- c("word1","word2","word1_stem","word2_stem")
  app_desc_bigrams <- app_desc_bigrams[ , !(names(app_desc_bigrams) %in% drops)]
  
  ## 1gram
  app_desc <- app_desc %>% 
    unnest_tokens(word, desc) %>% 
    anti_join(stop_words) %>%
    mutate(word_stem = wordStem(word)) 
  
  drops <- c("word")
  app_desc <- app_desc[ , !(names(app_desc) %in% drops)]
  
  tidy_text <- app_desc
  tidy_text_bigram <- app_desc_bigrams
  
  ################## Eliminar apps que no interesan ##################
  
  print("Eliminar apps que no interesan - 2gram")

  ##2gram
  keywords_delete_bigrams <- data.frame(word = c("weight loss", "free trial", "purchase subscription",
                                                 "trial period", "lose weight","confirm purchase",
                                                 "fat burn", "belly fat", "burn workout",
                                                 "apple watch", "itune account", "slim down",
                                                 "high intensity", "for kids"),
                                        stringsAsFactors = FALSE)
  keywords_delete_bigrams <- keywords_delete_bigrams %>%
    separate(word, c("word1", "word2"), sep = " ") %>%
    mutate(word1_stem = wordStem(word1, language="english")) %>%
    mutate(word2_stem = wordStem(word2, language="english"))
  keywords_delete_bigrams <- keywords_delete_bigrams %>% 
    mutate(word_stem = paste(word1_stem, word2_stem, sep = " "))
  drops <- c("word1","word2","word1_stem","word2_stem")
  keywords_delete_bigrams <- keywords_delete_bigrams[ , !(names(keywords_delete_bigrams) %in% drops)]
  
  vector_apps_bigram <- c()
  vector_apps_bigram <- app_desc_bigrams[app_desc_bigrams$word_stem %in% keywords_delete_bigrams, ]
  vector_apps_bigram <- unique( vector_apps_bigram$appId )
  
  app_desc <- app_desc[!app_desc$appId %in% vector_apps_bigram,]
  app_desc_bigrams <- app_desc_bigrams[!app_desc_bigrams$appId %in% vector_apps_bigram,]
  
  print("Eliminar apps que no interesan - 1gram")
  
  ##1gram

  ## From decision tree analysis:
  # If the description contains 'routine' -> accept otherwise delete
  keyword_accept <- "routine"

  keywords_delete  <- wordStem(word = c("ovulation", "fertil", "wearable", "baby", "pregnancy",
                                        "hypnosis", "longevity", "abs",
                                        "watches", "trial", "membership", "premium",
                                        "subscription", "meditation", "purchase", "yoga", "pilates",
                                        "zen", "relax", "mind", "eat", "food", "sleep",
                                        "tarot", "slim", "device", "reiky", "pet", "nutrition",
                                        "medication", "kids"))
  
  vector_apps <- c()
  vector_apps <- app_desc[app_desc$word_stem %in% keywords_delete, ]

  ## From decision tree analysis:
  # If the description contains 'routine' -> accept otherwise delete
  vector_apps <- app_desc[!app_desc$word_stem %in% keyword_accept, ]
  
  vector_apps <- unique( vector_apps$appId )
  
  app_desc <- app_desc[!app_desc$appId %in% vector_apps,]

  ## From decision tree analysis:
  # If the description contains 'routine' -> accept otherwise delete
  app_desc <- app_desc[app_desc$word_stem %in% vector_apps, ]

  app_desc_bigrams <- app_desc_bigrams[!app_desc_bigrams$appId %in% vector_apps,]
  
  app_desc <- app_desc[!is.na(app_desc$appId),] 
  app_desc_bigrams <- app_desc_bigrams[!is.na(app_desc_bigrams$appId),] 
  
  toDelete <- vector_apps[!vector_apps %in% vector_apps_bigram]
  
  toAccept_1gram <- app_desc %>% distinct(appId)
  toAccept_2gram <- app_desc_bigrams %>% distinct(appId)
  
  toAccept <- toAccept_1gram[!toAccept_1gram %in% toAccept_2gram]
  
  listToApp <- list(as.vector(unlist(toAccept)), as.vector(unlist(toDelete)))

  names(listToApp) <- c("accept", "delete")
  
  print("Hecho")
  
  listToApp
  
}
