import 'reflect-metadata';

import { PORT } from '@config/env';

import { database } from '@database/index';

import app from './app';

const port: number = Number(PORT) || 3333;

app.listen(port, async () => {
  database();

  console.log(`Server is running in port ${port}`);
});
