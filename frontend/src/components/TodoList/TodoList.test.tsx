// Say you have a component with the useLazyLoadQuery or a QueryRenderer
import React from 'react';
import faker from 'faker';
import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';
import { RelayEnvironmentProvider } from 'react-relay';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';

let idx = 1;

test('Loading State', () => {
  const environment = createMockEnvironment();

  environment.mock.queueOperationResolver((op) => {
    return MockPayloadGenerator.generate(op, {
      TodoItem() {
        return {
          id: `${idx++}`,
          item: faker.lorem.sentence(),
          createdAt: new Date().toISOString(),
        };
      },
    });
  });

  render(
    <React.Suspense fallback={'Loading...'}>
      <RelayEnvironmentProvider environment={environment}>
        <TodoList />
      </RelayEnvironmentProvider>
    </React.Suspense>
  );
  screen.debug();
});
