import todoItemsTable from '../../../database/tables/todo-items-table';
import type { GqlContext } from '../../context';
import { encodeId, withAuthorization } from '../utils';

export default {
  name: 'addTodoItem',
  resolver: withAuthorization(
    async (_: void, args: { input: { item: string } }, ctx: GqlContext) => {
      const id = await todoItemsTable.insert({
        item: args.input.item,
        userId: ctx.user.id,
      });

      const todoItem = await todoItemsTable.findOne(id);
      return !todoItem
        ? null
        : {
            ...todoItem,
            id: encodeId('Todo', todoItem.id),
            userId: encodeId('User', todoItem.userId),
          };
    }
  ),
};
