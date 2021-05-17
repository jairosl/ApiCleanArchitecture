module.exports = {
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "postgres",
   "password": "jairosl10",
   "database": "testbluelab",

  "migrations": ["./src/infra/db/migrations/**.ts"],
  "entities": ["./src/infra/db/Postgres/entities/*.ts"],
  "logging": false,
  "cli": {
    "migrationsDir": "./src/infra/db/migrations"
  }
}
