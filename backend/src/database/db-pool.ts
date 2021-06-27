import { Pool } from 'pg';
import environment from '../environment';

const db = environment().database;

export default new Pool({
  host: db.host,
  user: db.user,
  database: db.database,
  password: db.password,
  port: db.port,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
