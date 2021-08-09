import todoItemsTable from '../../../database/tables/todo-items-table';
import type { GqlContext } from '../../context';
import { decodeId, encodeId, withAuthorization } from '../utils';

export default {
  name: 'completeTodoItem',
  resolver: withAuthorization(async (_: void, args: { input: { id: string } }, ctx: GqlContext) => {
    const { id } = args.input;

    const todoItem = await todoItemsTable.complete(decodeId(id).id, ctx.user.id);
    return !todoItem ? null : { ...todoItem, id: encodeId('Todo', todoItem.id) };
  }),
};
