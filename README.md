# Recommender System TFG production MEAN Stack by Ana Escobar Llamazares

## Using Docker
### Pull the images:
Run `docker pull escobarana/tfg-app:plumber` to pull the plumber API image
Run `docker pull escobarana/tfg-app:server` to pull the system's image
### Run the images:
Run `docker-compose up -d`
### Print the output:
Run `docker ps` (get container ID)
Run `docker images` (get the images in your system)
Run `docker logs <container id>`  (print the system's output)
### Notes:
`escobarana/tfg-app` is a private docker repository so you will not be able to download the image unless access is granted to you

## Not using docker:
### Run the code:
Run `npm start` to start the system in your localhost
Go to `localhost:3000` or `127.0.0.1:3000` to see the system's home page
### Run tests:
Run `npm test` to execute mocha tests
