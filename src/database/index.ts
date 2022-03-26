import { DataSource } from 'typeorm';

import { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT } from '@config/env';

export const dataSource: DataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: ['./src/database/entity/*.ts'],
  synchronize: true,
});

dataSource.initialize();
