import * as React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useFragment, useMutation } from 'react-relay';
import moment from 'moment';
import type { TodoItem_item$key } from '../../../../__generated__/TodoItem_item.graphql';

type TodoItemProps = {
  item: TodoItem_item$key | null;
};

export default function TodoItem({ item }: TodoItemProps) {
  const data = useFragment(
    graphql`
      fragment TodoItem_item on TodoItem {
        id
        item
        createdAt
      }
    `,
    item
  );

  const [commitCompleteTodoItemMutation, isCommitCompleteTodoItemMutationInFlight] = useMutation(
    graphql`
      mutation TodoItemMutation($input: CompleteTodoItemMutationInput!) {
        completeTodoItem(input: $input) {
          ...TodoItem_item
        }
      }
    `
  );

  const [mouseoverTimeout, setMouseOverTimeout] = React.useState<NodeJS.Timeout | null>(null);
  const [isHovering, setIsHovering] = React.useState(false);

  if (!data) {
    return null;
  }

  const onMarkComplete = () => {
    commitCompleteTodoItemMutation({
      variables: { input: { id: data.id } },
      updater: (store) => {
        const payload = store.getRootField('completeTodoItem');
        const linkedRecords = store.getRoot().getLinkedRecords('todoItems');

        store.getRoot().setLinkedRecords(
          linkedRecords?.filter((x) => x.getDataID() !== payload?.getDataID()),
          'todoItems'
        );
      },
    });
  };

  return (
    <li
      style={{ transition: 'max-height 0.1s ease-out' }}
      className={`${isHovering ? 'max-h-48' : 'max-h-20'} w-96 my-4 p-4 bg-white rounded`}
      onMouseEnter={() => {
        setMouseOverTimeout(setTimeout(() => setIsHovering(true), 150));
      }}
      onMouseLeave={() => {
        if (mouseoverTimeout) {
          clearTimeout(mouseoverTimeout);
        }
        setIsHovering(false);
      }}
    >
      {data.item}
      <p className="text-sm text-gray-600">{moment(data.createdAt).fromNow()}</p>
      {isHovering ? (
        <div className="flex justify-end">
          <button
            disabled={isCommitCompleteTodoItemMutationInFlight}
            type="button"
            className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded text-xs"
            onClick={onMarkComplete}
          >
            Mark Complete
          </button>
        </div>
      ) : null}
    </li>
  );
}
