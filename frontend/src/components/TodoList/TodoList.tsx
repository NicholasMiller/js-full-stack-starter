import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay';
import { TodoListQuery } from '../../__generated__/TodoListQuery.graphql';
import TodoItem from './components/TodoItem/TodoItem';
import AddTodoItem from './components/AddTodoItem';

export default function TodoList() {
  const data = useLazyLoadQuery<TodoListQuery>(
    graphql`
      query TodoListQuery {
        todoItems {
          id
        }
      }
    `,
    {}
  );

  console.log('SOMETHING ELSE');

  if (!data?.todoItems) {
    console.log('BADFAFDA');
    return null;
  } else {
    console.log('BAM BAM', data);
  }

  return (
    <div className="flex justify-center">
      <ul>
        <AddTodoItem />
        {data.todoItems.map((i) => (
          <span>{i?.id}</span>
        ))}
      </ul>
    </div>
  );
}
