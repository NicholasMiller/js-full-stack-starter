import environment, { initTestingEnvironment } from './environment';
initTestingEnvironment();

import dbConnection from './database/db-connection';
import server from './gql/server';

export default async () => {
  const result = await dbConnection.migrate.latest();
  console.log('Migrations run ' + result);

  const { url } = await server.listen(environment().server.port);
  console.log(`Server ready at ${url}.`);
};
