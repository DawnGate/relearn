# This is microservices backend project

With

1. Gate way
2. User
3. Product
4. Order

# Config

- mongodb with docker for localhost running: pull docker image, setup name "mongo-microservices-shop", setup 27017/27017
- rabbitmq: docker for localhost running: pull docker image, setup port 15672:15672, 5672:5672, password default guest/guest

# This flow

1. gate way will forward api to other containers
2. container will using middleware authenticate(simple jwt verify one way)
3. order and product connect with each other through queue(rabitmq)

# Improves

1. User authenticate with jwt and have expire time for token
2. User have 1 more property(role), only admin can add Product
3. Re-structure for the current app -> make every containerize have same structure for easy maintain

# Questions

1. Why model user point to collections users, and order model specific collection property

- Answer: When not specific -> mongoose will create the collection base on the name in scheme, ex: Demo -> demos, if has collection options will the name of the collection will create in db

# Github ci/cd

This is a sub directory -> checkout to new branch, and put the repo to main directory

-> ex: ci/miniapp-micro-be just running for test ci ( not setup docker)

setting ci secrets repository params lik in workflows/test.yml

in server I using mongo serverless server

MONGO_AUTH_URI=mongodb+srv://username:userPassword@cluster-uri/micro-be-auth

MONGO_PRODUCT_URI=mongodb+srv://username:userPassword@cluster-uri/micro-be-product

I also setup all connection for 6 hours -> you need turn this connection when push or pull request to server

# Docker

- clean all:
  docker stop $(docker ps -qa) && docker system prune -af --volumes

- clean after build
  docker-compose rm -f
  docker-compose up --build -d

- restart
  docker-compose down && docker-compose build --no-cache && docker-compose up -d
