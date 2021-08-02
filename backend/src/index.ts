import { initEnvironment } from './environment';
initEnvironment();

import server from './gql/server';
import dbConnection from './database/db-connection';

const startup = async () => {
  const migration = await dbConnection.migrate.latest();
  console.log('DB migration run to ' + migration);

  const { url } = await server.listen();
  console.log(`Server ready at ${url}.`);
};

startup();
