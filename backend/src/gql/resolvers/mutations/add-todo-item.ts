import todoItemsTable from '../../../database/tables/todo-items-table';
import type { GqlContext } from '../../context';
import { encodeId, withAuthorization } from '../utils';

type AddTodoItemResolver = (
  _: void,
  args: { input: { item: string } },
  ctx: GqlContext
) => Promise<{
  id: string;
  userId: string;
  item: string;
  createdAt: Date;
  completedAt: Date;
} | null>;

const resolver: AddTodoItemResolver = async (_, args, ctx) => {
  const id = await todoItemsTable.insert({
    item: args.input.item,
    userId: ctx.user.id,
  });

  const todoItem = await todoItemsTable.findOne(id);

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
  name: 'addTodoItem',
  resolver: withAuthorization(resolver),
};
