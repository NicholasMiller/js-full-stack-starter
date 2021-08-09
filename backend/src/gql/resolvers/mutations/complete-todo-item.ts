import todoItemsTable from '../../../database/tables/todo-items-table';
import type { GqlContext } from '../../context';
import { decodeId, encodeId, withAuthorization } from '../utils';

type CompleteTodoItemResolver = (
  _: void,
  args: { input: { id: string } },
  ctx: GqlContext
) => Promise<{
  id: string;
  userId: string;
  item: string;
  createdAt: Date;
  completedAt: Date;
}>;

const resolver: CompleteTodoItemResolver = async (_, args, ctx) => {
  const { id } = args.input;

  const todoItem = await todoItemsTable.complete(decodeId(id).id, ctx.user.id);
  if (!todoItem) {
    return null;
  }

  return {
    ...todoItem,
    id: encodeId('Todo', todoItem.id),
    userId: encodeId('User', todoItem.userId),
  };
};

export default {
  name: 'completeTodoItem',
  resolver: withAuthorization(resolver),
};
