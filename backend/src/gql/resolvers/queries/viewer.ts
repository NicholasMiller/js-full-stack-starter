import { encodeId, withAuthorization } from '../utils';
import type { GqlContext } from '../../context';
import usersTable from '../../../database/tables/users-table';

export default {
  name: 'viewer',
  resolver: withAuthorization(async (_: any, __: any, ctx: GqlContext) => {
    const user = await usersTable.findOneByEmail(ctx.user.email);

    return {
      id: encodeId('User', user.id),
      ...user,
    };
  }),
};
