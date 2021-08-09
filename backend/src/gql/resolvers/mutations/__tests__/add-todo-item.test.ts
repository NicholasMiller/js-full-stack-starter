import faker from 'faker';
import usersTable from '../../../../database/tables/users-table';
import {
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/client/core';
import environment from '../../../../environment';
import fetch from 'cross-fetch';

interface TodoItem {
  userId: string;
  item: string;
  createdAt: string;
  completedAt: string;
  id: string;
}

const createClient = (token?: string) => {
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    }));

    return forward(operation);
  });

  const httpLink = new HttpLink({
    uri: `http://127.0.0.1:${environment().server.port}`,
    fetch,
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });
};

const createUserAndGetJwt = async () => {
  const email = faker.internet.email();
  const password = faker.internet.password();

  await usersTable.insert({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    profilePhotoUrl: faker.internet.avatar(),
    email,
    password,
  });

  const result = await createClient().mutate<{ login: string }>({
    mutation: gql`
      mutation Login($input: LoginMutationInput!) {
        login(input: $input)
      }
    `,
    variables: {
      input: { email, password },
    },
  });

  return result.data.login;
};

describe('Graph / Mutations / addTodoItem', () => {
  it('adds a todo item for a given user', async () => {
    const jwt = await createUserAndGetJwt();
    const todoItemMessage = 'hello, you beautiful world!';
    const result = await createClient(jwt).mutate<{ addTodoItem: TodoItem }>({
      mutation: gql`
        mutation AddTodoItem($input: AddTodoItemMutationInput!) {
          addTodoItem(input: $input) {
            id
            item
            createdAt
          }
        }
      `,
      variables: {
        input: { item: todoItemMessage },
      },
    });

    expect(typeof result.data.addTodoItem.id === 'string').toBeTruthy();
    expect(result.data.addTodoItem.item).toBe(todoItemMessage);
  });
});
