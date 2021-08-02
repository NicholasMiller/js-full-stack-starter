import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import userTable, { UsersTableRecord } from '../database/tables/users-table';
import environment from '../environment';

export interface GqlContext {
  user: UsersTableRecord | null;
}

export default async ({ req }): Promise<GqlContext> => {
  const authorization = req.headers.authorization;
  const matches = /^Bearer (.*)$/i.exec(authorization);

  if (!matches) {
    return { user: null };
  }

  try {
    const payload = jwt.verify(matches[1], environment().jwt.secret);
    const context =
      typeof payload === 'object'
        ? { user: await userTable.findOneByEmail(payload.sub) }
        : { user: null };

    return context;
  } catch (ex) {
    throw new AuthenticationError('Your JWT token is invalid');
  }
};
