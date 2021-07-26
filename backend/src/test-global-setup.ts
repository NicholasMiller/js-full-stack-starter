import environment, { initTestingEnvironment } from './environment';
initTestingEnvironment();

import { Liquibase, POSTGRESQL_DEFAULT_CONFIG } from 'liquibase';
import server from './gql/server';

const { database: dbConfig, server: serverConfig } = environment();

const liquibase = new Liquibase({
  ...POSTGRESQL_DEFAULT_CONFIG,
  url: `jdbc:postgresql://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`,
  username: dbConfig.user,
  password: dbConfig.password,
  changeLogFile: './db-migrations.xml',
});

export default async () => {
  await liquibase.update({});

  const { url } = await server.listen(serverConfig.port);
  console.log(`Server ready at ${url}.`);
};
