#!/bin/bash

# Reset every run before this one, delete every migration and all the Docker generated files.
docker compose down > /dev/null 2>&1
rm -r prisma/migrations > /dev/null 2>&1
rm -r node_modules > /dev/null 2>&1
docker rm -f $(docker ps -a -q -f name=social-todo) > /dev/null 2>&1
docker image rm social-todo-api > /dev/null 2>&1
docker volume rm $(docker volume ls -q -f name=social-todo) > /dev/null 2>&1


# Source the .env file.
. $(dirname "$0")/.env

# Install packages.
echo "Installing packages."
npm i > /dev/null 2>&1

# Run Docker container with the database.
echo "Composing up the database."
docker compose up db -d >/dev/null 2>&1

# Wait for MySQL connectivity
echo "Waiting for MySQL database to become available."
while ! docker exec social-todo-db-1 mysql --protocol=tcp -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USERNAME" -p"$DB_PASSWORD" -e "use $DB_DATABASE" >/dev/null 2>&1; do
    sleep 1
done
echo "MySQL database is now running and accessible."

# Run migration.
echo "Running first migration."
npx prisma migrate dev --name init --schema ./prisma/local.schema.prisma >/dev/null 2>&1

# Generate Prisma Client
echo "Generating Prisma Client."
npx prisma generate >/dev/null 2>&1

# Compose and run the API.
echo "Composing up the API."
docker compose up api

exit 0