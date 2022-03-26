import { DataSource } from 'typeorm';

import { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT } from '@config/env';

export function database(): void {
  new DataSource({
    name: 'default',
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    entities: [
      './src/database/app/entity/*.ts',
      './dist/src/database/app/entity/*.js',
    ],
    migrations: ['./src/database/app/migrations/*.ts'],
  }).initialize();
}
