module.exports = {
   "type": "postgres",
   "host": process.env.HOST_DB,
   "port": process.env.PORT_DB,
   "username": process.env.USERNAME_DB,
   "password": process.env.PASSWORD_DB,
   "database": process.env.NAME_DB,

  "migrations": ["./src/infra/db/migrations/**.ts"],
  "entities": ["./src/infra/db/Postgres/entities/*.ts"],
  "logging": false,
  "cli": {
    "migrationsDir": "./src/infra/db/migrations"
  }
}
