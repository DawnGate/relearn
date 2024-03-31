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
