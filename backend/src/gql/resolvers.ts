import jwt from 'jsonwebtoken';
import todoItemsTable from '../database/tables/todo-items-table';
import usersTable from '../database/tables/users-table';
import environment from '../environment';
import { GqlContext } from './context';

export default {
  Query: {
    testMessage: () => {
      return 'Hello World!';
    },
  },
  Mutation: {
    addTodoItem: async (_: void, args: { item: string }, ctx: GqlContext) => {
      const id = await todoItemsTable.insert({
        item: args.item,
        display_order: 0,
        user_id: ctx.user.id,
      });

      return await todoItemsTable.findOne(id);
    },
    removeTodoItem: (_: void, args: { id: number }, ctx: GqlContext) => {
      return todoItemsTable.delete(args.id, ctx.user.id);
    },
    login: async (_: void, args: { email: string; password: string }) => {
      const { email, password } = args;

      const user = await usersTable.findOneByEmailAndPassword(email, password);

      if (!user) {
        return null;
      }

      return jwt.sign(
        {
          first_name: user.first_name,
          last_name: user.last_name,
        },
        environment().jwt.secret,
        {
          expiresIn: '1d',
          algorithm: 'HS256',
          subject: email,
        }
      );
    },
  },
};
