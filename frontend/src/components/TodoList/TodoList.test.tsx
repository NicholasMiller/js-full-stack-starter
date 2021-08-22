// Say you have a component with the useLazyLoadQuery or a QueryRenderer
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import TodoList from './TodoList';
import { RelayEnvironmentProvider } from 'react-relay';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';

test('Loading State', () => {
  const environment = createMockEnvironment();

  environment.mock.queueOperationResolver((op) => {
    return MockPayloadGenerator.generate(op);
  });

  render(
    <React.Suspense fallback={'Loading...'}>
      <RelayEnvironmentProvider environment={environment}>
        <TodoList />
      </RelayEnvironmentProvider>
    </React.Suspense>
  );

  screen.debug();

  // Here we just verify that the spinner is rendered
  //expect(renderer.root.find((node) => node.props['data-testid'] === 'spinner')).toBeDefined();
});

/*
// Relay may trigger 3 different states
// for this component: Loading, Error, Data Loaded
// Here is examples of tests for those states.
test('Loading State', () => {
  const environment = createMockEnvironment();
  const renderer = TestRenderer.create(<TodoList environment={environment} />);

  // Here we just verify that the spinner is rendered
  expect(renderer.root.find((node) => node.props['data-testid'] === 'spinner')).toBeDefined();
});

test('Data Render', () => {
  const environment = createMockEnvironment();
  const renderer = TestRenderer.create(<TodoList environment={environment} />);

  // Wrapping in TestRenderer.act will ensure that components
  // are fully updated to their final state.
  TestRenderer.act(() => {
    environment.mock.resolveMostRecentOperation((operation) =>
      MockPayloadGenerator.generate(operation)
    );
  });

  // At this point operation will be resolved
  // and the data for a query will be available in the store
  expect(renderer.root.find((node) => node.props['data-testid'] === 'myButton')).toBeDefined();
});

test('Error State', () => {
  const environment = createMockEnvironment();
  const renderer = TestRenderer.create(<TodoList environment={environment} />);

  // Wrapping in TestRenderer.act will ensure that components
  // are fully updated to their final state.
  TestRenderer.act(() => {
    // Error can be simulated with `rejectMostRecentOperation`
    environment.mock.rejectMostRecentOperation(new Error('Uh-oh'));
  });

  expect(renderer.root.find((item) => (item.props.testID = 'errorMessage'))).toBeDefined();
});
*/
