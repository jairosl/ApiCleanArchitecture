import { createConnection } from 'typeorm';
import { Database } from '../../contracts/database';

export class PostgresDatabase implements Database {
  async connect() {
    const connection = await createConnection();
    return connection;
  }
}
