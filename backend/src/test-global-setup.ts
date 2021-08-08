// we will be configuring the application to use a testing db
process.env.TODO_APP_DB_DATABASE = 'todo_app_testing';
process.env.TODO_APP_GQL_PORT = '4001';

import environment, { initEnvironment } from './environment';
initEnvironment();

import dbConnection from './database/db-connection';
import server from './gql/server';

/**
 * Used by the testing environment to have a clean database with every run
 */
const recreateDatabase = async () => {
  await dbConnection.raw('DROP SCHEMA public CASCADE');
  await dbConnection.raw('CREATE SCHEMA public');
  await dbConnection.raw('GRANT ALL ON SCHEMA public TO public');

  // needed for bcrypting passwords
  await dbConnection.raw('CREATE EXTENSION pgcrypto');
  await dbConnection.raw('SELECT * FROM pg_extension');
};

export default async () => {
  await recreateDatabase();

  const result = await dbConnection.migrate.latest();
  console.log('Migrations run ' + result);

  const { url } = await server.listen(environment().server.port);
  console.log(`Server ready at ${url}.`);
};
