import knex from 'knex';
import { Pool } from 'pg';
import environment from '../environment';
import knexStringcase from 'knex-stringcase';

const dbConfig = environment().database;

export default knex(
  knexStringcase({
    client: 'pg',
    connection: {
      host: dbConfig.host,
      user: dbConfig.user,
      database: dbConfig.database,
      password: dbConfig.password,
      port: dbConfig.port,
    },
    searchPath: ['knex', 'public'],
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds',
    },
  })
);
