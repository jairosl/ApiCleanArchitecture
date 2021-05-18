import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import 'express-async-errors';
import { PostgresDatabase } from './infra/db/Postgres/connection';
import { router } from './routes';
import { ValidationError } from './domain/errors/ValidatorError';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof ValidationError) {
    return response.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'Error',
    message: `Ìnternal server Error ${err.message}`,
  });
});

export { app };
