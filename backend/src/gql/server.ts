import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import typeDefs from './type-defs';
import context from './context';

export default new ApolloServer({ resolvers, typeDefs, context });
