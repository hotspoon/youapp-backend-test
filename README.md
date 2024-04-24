## Description

YouApp test backend project

## Installation

```bash
$ npm install
```

## Running the app with Docker

Before running the app, make sure Docker is installed and running on your machine. You can download Docker from the [official website](https://www.docker.com/products/docker-desktop).

1. **Build the Docker image**: This will create a Docker image based on the instructions in your Dockerfile. Run the following command in the terminal:

```bash
docker-compose build
```

2. **Run the Docker containers**: This will start your application and all its services (app, redis, rabbitmq) in separate Docker containers. Run the following command in the terminal:

```bash
docker-compose up
```

Your application should now be running at `http://localhost:4000`.

3. **Stop the Docker containers**: When you're done, you can stop the Docker containers by running the following command in the terminal:

```bash
docker-compose down
```

## Running the app without Docker

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
