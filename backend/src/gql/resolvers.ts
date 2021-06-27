import { ForbiddenError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import todoItemsTable from '../database/tables/todo-items-table';
import usersTable from '../database/tables/users-table';
import environment from '../environment';
import { GqlContext } from './context';

const withAuthorization = (fn: Function) => (parent: any, args: any, ctx: GqlContext) => {
  if (ctx.user === null) {
    throw new ForbiddenError('You are not allowed to access this part of the Graph');
  }

  return fn(parent, args, ctx);
};

const encodeId = (type: string, dbId: number) => {
  return Buffer.from(`${type}:${dbId}`).toString('base64');
};

const decodeId = (encodedId: string) => {
  const [type, id] = Buffer.from(encodedId, 'base64').toString().split(':');
  return { type, id: parseInt(id, 10) };
};

export default {
  Query: {
    todoItems: withAuthorization(async (_: any, __: any, ctx: GqlContext) => {
      const items = (await todoItemsTable.findByUserId(ctx.user.id)).map((item) => ({
        ...item,
        id: encodeId('Todo', item.id),
      }));

      return items;
    }),
  },
  Mutation: {
    addTodoItem: async (_: void, args: { item: string; displayOrder: number }, ctx: GqlContext) => {
      const id = await todoItemsTable.insert({
        item: args.item,
        displayOrder: args.displayOrder,
        userId: ctx.user.id,
      });

      const todoItem = await todoItemsTable.findOne(id);
      return !todoItem
        ? null
        : {
            ...todoItem,
            id: encodeId('Todo', todoItem.id),
          };
    },
    removeTodoItem: (_: void, args: { id: string }, ctx: GqlContext) => {
      return todoItemsTable.delete(decodeId(args.id).id, ctx.user.id);
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
