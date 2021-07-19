import * as React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay';
import { TodoListQuery } from '../../__generated__/TodoListQuery.graphql';
import TodoItem from './components/TodoItem';
import AddTodoItem from './components/AddTodoItem';

function TodoList() {
  const data = useLazyLoadQuery<TodoListQuery>(
    graphql`
      query TodoListQuery {
        todoItems {
          id
          ...TodoItem_item
        }
      }
    `,
    {}
  );

  if (!data?.todoItems) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <ul>
        <AddTodoItem />
        {data.todoItems.map((i) => (
          <TodoItem item={i} key={`todo-item-${i?.id}`} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
