import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const GQL_ENDPOINT = 'http://localhost:4000/graphql';
const LOCAL_STORAGE_TOKEN_KEY = 'authorizationToken';

let authorizationToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

export const storeAuthorizationToken = (token: string): void => {
  window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
  authorizationToken = token;
  console.log(`SET LOCAL STORAGE ${LOCAL_STORAGE_TOKEN_KEY} to ${token}`);
};

const clearAuthorizationToken = () => {
  authorizationToken = null;
  window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, '');
};

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
const fetchQueryWithAuthFailureHandling = (onAuthFailure: (error: any) => void) => {
  return async (operation: any, variables: any, cacheConfig: any, uploadables: any) => {
    const response = await fetch(GQL_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: authorizationToken ? `Bearer ${authorizationToken}` : '',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: operation.text, // GraphQL text from input
        variables,
      }),
    });

    const json = await response.json();

    // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
    // property of the response. If any exceptions occurred when processing the request,
    // throw an error to indicate to the developer what went wrong.
    if (Array.isArray(json.errors)) {
      debugger;
      if (json.errors[0]?.extensions?.code === 'FORBIDDEN') {
        clearAuthorizationToken();
        onAuthFailure(json.errors[0]);
      }

      debugger;
      throw new Error(
        `Errorzzz fetching GraphQL query '${operation.name}' with variables '${JSON.stringify(
          variables
        )}': ${JSON.stringify(json.errors)}`
      );
    }

    // Otherwise, return the full payload.
    return json;
  };
};

export default function createRelayEnvironment({
  onAuthFailure,
}: {
  onAuthFailure: (error: any) => void;
}) {
  // Create a network layer from the fetch function
  const network = Network.create(fetchQueryWithAuthFailureHandling(onAuthFailure));
  const store = new Store(new RecordSource());

  return new Environment({
    network,
    store,
  });
}
