import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import 'express-async-errors';
import { PostgresDatabase } from './infra/db/Postgres/connection';
import { router } from './routes';

dotenv.config();

const pg = new PostgresDatabase();

pg.connect();

const app = express();

app.use(cors({
  origin: '*',
}));

app.use(helmet());

app.use(express.json());
app.use(router);

export { app };
