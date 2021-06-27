import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import typeDefs from './type-defs';
import context from './context';
import environment from '../environment';

export default new ApolloServer({
  resolvers,
  typeDefs,
  context,
  cors: { origin: environment().cors.host },
});
