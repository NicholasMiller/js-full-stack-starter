import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import TodoList from '../TodoList';
import { RelayEnvironmentProvider } from 'react-relay';
import createRelayEnvironment, { storeAuthorizationToken } from '../../createRelayEnvironment';
import Login from '../Login';
import type RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';
import Navigation from '../Navigation';

function ApplicationShell() {
  const history = useHistory();
  const [environment, setEnvironment] = React.useState<RelayModernEnvironment>(
    createRelayEnvironment({ onAuthFailure: () => history.push('/login') })
  );
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Switch>
        <Route exact path="/">
          <Navigation />
          <TodoList />
        </Route>
        <Route exact path="/login">
          <Login
            onAuth={(token) => {
              storeAuthorizationToken(token);
              setEnvironment(
                createRelayEnvironment({ onAuthFailure: () => history.push('/login') })
              );

              history.push('/');
            }}
          />
        </Route>
      </Switch>
    </RelayEnvironmentProvider>
  );
}

export default ApplicationShell;
