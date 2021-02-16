# Description

Dockerized app based on React and Node
Here is used foreman to client and server use mutual node_modules

### Build

docker-compose run build
docker-compose run app yarn install
docker-compose run -p 3003:3003 -p 4004:4004 app

### Add dependency

docker-compose run app $dependency

### Run tests

docker-compose run test
