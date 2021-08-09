import addTodoItem from './add-todo-item';
import completeTodoItem from './complete-todo-item';
import login from './login';

export default [addTodoItem, completeTodoItem, login].reduce(
  (mutations, m) => ({
    ...mutations,
    [m.name]: m.resolver,
  }),
  {}
);
