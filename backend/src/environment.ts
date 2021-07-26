import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

export const initEnvironment = () => {
  dotenv.config();
};

export const initTestingEnvironment = () => {
  const envConfig = dotenv.parse(fs.readFileSync(path.join(__dirname, '..', '.env.testing')));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
};

export default () => ({
  database: {
    user: process.env.TODO_APP_DB_USER,
    password: process.env.TODO_APP_DB_PASSWORD,
    host: process.env.TODO_APP_DB_HOST,
    database: process.env.TODO_APP_DB_DATABASE,
    port: parseInt(process.env.TODO_APP_DB_PORT, 10),
  },
  jwt: {
    secret: process.env.TODO_APP_JWT_SECRET,
  },
  cors: {
    host: process.env.TODO_APP_SERVER_CORS,
  },
  server: {
    port: process.env.TODO_APP_SERVER_PORT,
  },
});
