import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import userTable, { UsersTableRecord } from '../database/tables/users-table';
import environment from '../environment';

export interface GqlContext {
  user: UsersTableRecord | null;
}

export default async ({ req }): Promise<GqlContext> => {
  const token = req.headers.authorization || '';

  if (!token) {
    return { user: null };
  }

  try {
    const payload = jwt.verify(token, environment().jwt.secret);
    return typeof payload === 'object'
      ? { user: await userTable.findOneByEmail(payload.sub) }
      : { user: null };
  } catch (ex) {
    throw new AuthenticationError('Your JWT token is invalid');
  }
};
