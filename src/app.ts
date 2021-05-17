import express from 'express';
import 'reflect-metadata';
import { PostgresDatabase } from './infra/db/Postgres/connection';
import { router } from './routes';

const pg = new PostgresDatabase();

pg.connect();

const app = express();

app.use(express.json());
app.use(router);

export { app };
