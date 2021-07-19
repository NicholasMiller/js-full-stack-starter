import * as React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useFragment } from 'react-relay';
import type { TodoItem_item$key } from '../../../__generated__/TodoItem_item.graphql';
import moment from 'moment';

type TodoItemProps = {
  item: TodoItem_item$key | null;
};

export default function TodoItem({ item }: TodoItemProps) {
  const data = useFragment(
    graphql`
      fragment TodoItem_item on TodoItem {
        item
        createdAt
      }
    `,
    item
  );

  return data ? (
    <li className="w-96 mb-4 mt-4 p-4 bg-white rounded">
      {data.item}
      <p className="text-sm text-gray-600">{moment(data.createdAt).fromNow()}</p>
    </li>
  ) : null;
}
