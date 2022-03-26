import 'reflect-metadata';

import '@shared/container';

import '@database/index';

import { PORT } from '@config/env';

import app from './app';

const port: number = Number(PORT) || 3333;

app.listen(port, async () => console.log(`Server is running in port ${port}`));
