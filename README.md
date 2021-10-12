# ✨Pokemon Tournament✨
Pokemon Tournament is a webapp where you can create and edit your own team, Symfony5, ReactJS and Tailwind-powered.

## Features
- Create your own team, name it and catch pokemons
- You can see all the teams in a dedicated page
- Automatic base experience calculation
- Delete team members and catch new pokemons!

## Installation

Clone the repository by following the instructions below ([Docker](http://google.com) is needed):

Run nginx and php service:
```sh
docker compose up nginx php -d
```
You don't need to have Composer or Node installed in your local machine because this project has two utilities container (Node, Composer).
Run this command to dockerize Composer and Node in container (the containers will be removed as soon as the installation ends):

```sh
docker compose run --rm  composer install
docker compose run --rm  node install
```

Now you have symfony installed in your container. 
Run the migrations:

```sh
docker exec php bin/console doctrine:migration:migrate
```

build frontend:

```sh
docker compose run --rm  node run dev
```


This is the complete command list:

```sh
docker compose up nginx php -d
docker compose run --rm  composer install
docker compose run --rm  node install
docker exec php bin/console doctrine:migration:migrate
docker compose run --rm  node run dev
```

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8080 or localhost:8080
```

## Tech
![nginx](https://avatars.githubusercontent.com/u/1412239?s=200&v=4) ![Symfony5](https://camo.githubusercontent.com/5f629ca13dac6ce46fb0ba69780cf8480f753143d768a99750716bd75ed01c4a/68747470733a2f2f73796d666f6e792e636f6d2f6c6f676f732f73796d666f6e795f626c61636b5f30322e737667)  ![Tailwind](https://camo.githubusercontent.com/76fc893540a16d0acb4967472a5195511ec64fd8d98f377cb00dc8fa73ffb67b/68747470733a2f2f7265666163746f72696e6775692e6e7963332e63646e2e6469676974616c6f6365616e7370616365732e636f6d2f7461696c77696e642d6c6f676f2d737469636b65722e737667)
![Reactjs](https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/React_Native_Logo.png/320px-React_Native_Logo.png)
