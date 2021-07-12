import * as React from 'react';
import { Button, Form, Input } from 'reactstrap';
import { graphql } from 'babel-plugin-relay/macro';
import { useMutation } from 'react-relay';
import type { LoginMutation } from '../../__generated__/LoginMutation.graphql';

export default function Login() {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const [commit, isInFlight] = useMutation<LoginMutation>(graphql`
    mutation LoginMutation($input: LoginMutationInput!) {
      login(input: $input)
    }
  `);

  const submitDisabled = React.useMemo(() => {
    return !email.trim() || !password.trim(); // || isInFlight;
  }, [email, password]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Input onChange={(e) => setEmail(e.target.value)} type="email" />
      <Input onChange={(e) => setPassword(e.target.value)} type="password" />
      <Button
        disabled={submitDisabled}
        type="submit"
        onClick={() => {
          commit({
            variables: { input: { email, password } },
            onCompleted(token) {
              console.log(token);
            },
          });
        }}
      >
        {isInFlight ? 'One Moment...' : 'Login'}
      </Button>
    </Form>
  );
}
