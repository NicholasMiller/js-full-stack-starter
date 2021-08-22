import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useMutation } from 'react-relay';
import type { LoginMutation } from '../../__generated__/LoginMutation.graphql';
import Logo from '../Logo';

const LoginErrorAlert = () => (
  <div
    className="mb-4 mt-4 text-sm bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
    role="alert"
  >
    <p className="font-bold">Invalid Credentials</p>
    <p>The credentials you provided were not in our system.</p>
  </div>
);

interface LoginProps {
  onAuth: (token: string) => void;
}

export default function Login({ onAuth }: LoginProps) {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isLoginError, setLoginError] = React.useState<boolean>(false);

  const [commit, isInFlight] = useMutation<LoginMutation>(graphql`
    mutation LoginMutation($input: LoginMutationInput!) {
      login(input: $input)
    }
  `);

  const submitDisabled = React.useMemo(() => {
    return !email.trim() || !password.trim() || isInFlight;
  }, [email, password, isInFlight]);

  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    setLoginError(false);

    commit({
      variables: { input: { email, password } },
      onCompleted({ login }) {
        if (login !== null) {
          onAuth(login);
        } else {
          setLoginError(true);
        }
      },
    });
  };

  return (
    <div className="items-center justify-center flex min-h-screen">
      <div className="w-96 justify-center flex flex-col">
        <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Logo className="m-auto mb-4 mt-4" height={100} width={100} />
          {isLoginError ? <LoginErrorAlert /> : null}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              onChange={(evt) => setEmail(evt.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="user@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              onChange={(evt) => setPassword(evt.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
            />
          </div>
          <div className="flex justify-end">
            <button
              disabled={submitDisabled}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-white text-xs">
          &copy;{new Date().getFullYear()} Todo App. All rights reserved.
        </p>
      </div>
    </div>
  );
}
