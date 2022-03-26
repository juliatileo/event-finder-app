import { config } from 'dotenv';

config({ path: `${process.cwd()}/.env` });

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT, PORT } = process.env;

export { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT, PORT };
