import * as React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Switch, Route, useHistory } from 'react-router-dom';
import TodoList from '../../TodoList';
import { RelayEnvironmentProvider } from 'react-relay';
import createRelayEnvironment from '../../createRelayEnvironment';
import Login from '../Login';

function ApplicationShell() {
  const history = useHistory();
  return (
    <RelayEnvironmentProvider
      environment={createRelayEnvironment({
        onAuthFailure: () => {
          history.push('/login');
        },
      })}
    >
      <div className="container">
        <Navbar color="light" light expand="md">
          <NavbarBrand>Todo App</NavbarBrand>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <TodoList />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </RelayEnvironmentProvider>
  );
}

export default ApplicationShell;
