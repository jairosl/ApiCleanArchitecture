import express from 'express';
import 'reflect-metadata';
import { PostgresDatabase } from './infra/db/Postgres/connection';

const pg = new PostgresDatabase();

pg.connect();

const app = express();

app.use(express.json());

export { app };
