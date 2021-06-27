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
    addTodoItem: async (_: void, args: { item: string; displayOrder: number }, ctx: GqlContext) => {
      const id = await todoItemsTable.insert({
        item: args.item,
        displayOrder: args.displayOrder,
        userId: ctx.user.id,
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
          firstName: user.firstName,
          lastName: user.lastName,
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
