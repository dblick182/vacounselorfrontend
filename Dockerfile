# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:10

WORKDIR /usr/src/app

COPY . .
Run npm i

ENTRYPOINT [ "npm" ]

CMD [ "run", "start" ]