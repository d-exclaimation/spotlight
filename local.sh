#!/bin/bash

# Check for environment variables
if [ ! -f ./.env ]; then
    echo "Environment variables not found. Please create a .env file in the root directory."
    exit 1
fi

# Stop any previous docker container
docker stop spotlight

# Build and run the docker container
docker build -t spotlight .
docker run --env PORT=4000 --env-file ./.env -p 4000:4000 spotlight