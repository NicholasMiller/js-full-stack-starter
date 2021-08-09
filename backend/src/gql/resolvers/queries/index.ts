import todoItems from './todo-items';
import viewer from './viewer';

export default [todoItems, viewer].reduce(
  (queries, q) => ({
    ...queries,
    [q.name]: q.resolver,
  }),
  {}
);
