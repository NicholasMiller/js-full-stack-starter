import faker from 'faker';
import usersTable from '../../database/tables/users-table';
import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client/core';
import environment from '../../environment';
import fetch from 'cross-fetch';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: `http://127.0.0.1:${environment().server.port}`, fetch }),
});

describe('JWT', () => {
  it('issues a JWT when a correct username and password is provided', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await usersTable.insert({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      profilePhotoUrl: faker.internet.avatar(),
      email,
      password,
    });

    const result = await client.mutate<{ login: string }>({
      mutation: gql`
        mutation Login($input: LoginMutationInput!) {
          login(input: $input)
        }
      `,
      variables: {
        input: { email, password },
      },
    });

    expect(typeof result.data.login === 'string').toBeTruthy();
    expect(result.data.login).toBeTruthy();
  });
});
