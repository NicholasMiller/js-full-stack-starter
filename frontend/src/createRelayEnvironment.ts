import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const GQL_ENDPOINT = 'http://localhost:4000/graphql';

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
const fetchQueryWithAuthFailureHandling =
  (onAuthFailure: (error: any) => void) =>
  async (operation: any, variables: any, cacheConfig: any, uploadables: any) => {
    const response = await fetch(GQL_ENDPOINT, {
      method: 'POST',
      headers: {
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
      if (json.errors[0].extensions?.code === 'FORBIDDEN') {
        onAuthFailure(json.errors[0]);
      }

      throw new Error(
        `Error fetching GraphQL query '${operation.name}' with variables '${JSON.stringify(
          variables
        )}': ${JSON.stringify(json.errors)}`
      );
    }

    // Otherwise, return the full payload.
    return json;
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
