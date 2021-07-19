import * as React from 'react';
import { useMutation } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import type { AddTodoItemMutation } from '../../../__generated__/AddTodoItemMutation.graphql';

export default function AddTodoItem() {
  const [todoText, setTodoText] = React.useState<string>('');

  const [commit, isInFlight] = useMutation<AddTodoItemMutation>(graphql`
    mutation AddTodoItemMutation($input: AddTodoItemMutationInput!) {
      addTodoItem(input: $input) {
        ...TodoItem_item
      }
    }
  `);

  return (
    <li className="w-96 my-4 p-4 bg-white rounded">
      <form
        className="flex flex-col"
        onSubmit={(evt) => {
          evt.preventDefault();

          commit({
            variables: {
              input: { item: todoText },
            },
            onCompleted: () => {
              setTodoText('');
            },
            updater(store) {
              const payload = store.getRootField('addTodoItem');

              const linkedRecords = [
                ...(store.getRoot().getLinkedRecords('todoItems') ?? []),
                payload,
              ];

              store.getRoot().setLinkedRecords(linkedRecords, 'todoItems');
            },
          });
        }}
      >
        <input
          type="text"
          onChange={(evt) => setTodoText(evt.target.value)}
          value={todoText}
          className="rounded bg-gray-200 p-2 flex-1"
          placeholder="Your new todo item"
        />
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={!todoText.trim() || isInFlight}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          >
            Login
          </button>
        </div>
      </form>
    </li>
  );
}
