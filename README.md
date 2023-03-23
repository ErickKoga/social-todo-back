# Social ToDo

This project is a social "to-do" website designed for a proficiency test. It allows users to add tasks to their personal page and view tasks added by other users. Additionally, users can edit or delete their own tasks.

[Check out this project's backend](https://github.com/ErickKoga/social-todo-front)

## Run Locally

To run this project locally, there are two ways: the convenience script which does everything in a simple execution, or running each command yourself.

### Convenience script

- Clone the project.

```bash
  git clone https://github.com/ErickKoga/social-todo
```

- Go to the project directory.

```bash
  cd social-todo
```

- Insert the provided environment variables in the directory root.

- Give execution permission to the script.

```bash
  chmod +x convenience-script.sh
```

- Run the script.

```bash
  ./convenience-script.sh
```

### DIY

- Clone the project.

```bash
  git clone https://github.com/ErickKoga/social-todo
```

- Go to the project directory.

```bash
  cd social-todo
```

- Insert the provided environment variables in the directory root.

- Install dependencies.

```bash
  npm i
```

- Compose the Dockerfile.

```bash
  docker compose up db -d
```

- After the database fully starts, run the first migration.

```bash
  npx prisma migrate dev --name init --schema ./prisma/local.schema.prisma
```

- Generate the Prisma Client.

```bash
  npx prisma generate
```

- Compose the API.

```bash
  docker compose up api
```

## Author

Erick Koga

- [GitHub](https://github.com/erickkoga)
- [LinkedIn](https://linkedin.com/in/erick-koga)
