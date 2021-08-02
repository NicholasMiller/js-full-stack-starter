import server from './gql/server';
import dbConnection from './database/db-connection';

export default async () => {
  await server.stop();
  await dbConnection.destroy();
};
