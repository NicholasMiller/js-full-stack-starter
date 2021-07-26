import { initEnvironment } from './environment';
initEnvironment();

import server from './gql/server';

server.listen().then(({ url }) => console.log(`Server ready at ${url}.`));
