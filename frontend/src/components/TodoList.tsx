import * as React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay';
import { TodoListQuery } from '../__generated__/TodoListQuery.graphql';

function TodoList() {
  const data = useLazyLoadQuery<TodoListQuery>(
    graphql`
      query TodoListQuery {
        todoItems {
          id
          item
        }
      }
    `,
    {}
  );

  if (!data) {
    return null;
  } else {
    console.log(data.todoItems);
  }

  return (
    <ul>
      {data.todoItems?.map((i) => (
        <li>{i?.item}</li>
      ))}
    </ul>
  );
}

export default TodoList;
