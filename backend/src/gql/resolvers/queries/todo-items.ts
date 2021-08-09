import todoItemsTable from '../../../database/tables/todo-items-table';
import { encodeId, withAuthorization } from '../utils';
import type { GqlContext } from '../../context';

export default {
  name: 'todoItems',
  resolver: withAuthorization(async (_: any, __: any, ctx: GqlContext) => {
    const items = (await todoItemsTable.findIncompleteByUserId(ctx.user.id)).map((item) => ({
      ...item,
      id: encodeId('Todo', item.id),
    }));

    return items;
  }),
};
