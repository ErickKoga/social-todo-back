#!/bin/bash

# Reset every run before this one, delete every migration and all the Docker generated files.
echo "CONVENIENCE SCRIPT: Hard reset..."
docker compose down > /dev/null 2>&1
rm -r prisma/migrations > /dev/null 2>&1
rm -r node_modules > /dev/null 2>&1
docker rm -f $(docker ps -a -q -f name=social-todo-back) > /dev/null 2>&1
docker image rm social-todo-back-api > /dev/null 2>&1
docker volume rm $(docker volume ls -q -f name=social-todo-back) > /dev/null 2>&1


# Source the .env file.
set -o allexport
source .env
set +o allexport

# Install packages.
echo "CONVENIENCE SCRIPT: Installing packages..."
npm i > /dev/null 2>&1

# Run Docker container with the database.
echo "CONVENIENCE SCRIPT: Composing up the database..."
docker compose up db -d >/dev/null 2>&1

# Wait for MySQL connectivity
echo "CONVENIENCE SCRIPT: Waiting for MySQL database to become available..."
while ! docker exec $DB_HOST_ALIAS mysql --protocol=tcp -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USERNAME" -p"$DB_PASSWORD" -e "use $DB_DATABASE" > /dev/null 2>&1; do
    sleep 1
done
echo "CONVENIENCE SCRIPT: MySQL database is now running and accessible..."

# Run migration.
echo "CONVENIENCE SCRIPT: Running first migration..."
npx prisma migrate dev --name init --schema ./prisma/local.schema.prisma >/dev/null 2>&1

# Generate Prisma Client
echo "CONVENIENCE SCRIPT: Generating Prisma Client..."
npx prisma generate >/dev/null 2>&1

# Compose and run the API.
echo "CONVENIENCE SCRIPT: Composing up the API..."
docker compose up api

exit 0