FROM node:latest
RUN apt-get update
WORKDIR /var/www/pokemon
ENTRYPOINT ["npm"]