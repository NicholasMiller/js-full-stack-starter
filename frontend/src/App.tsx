import React from 'react';
import './App.scss';
import { Navbar, NavbarBrand, Button } from 'reactstrap';

import graphql from 'babel-plugin-relay/macro';
// instead of:
//   import { graphql } from "babel-plugin-relay"

graphql`
  query UserQuery {
    viewer {
      id
    }
  }
`;

function App() {
  return (
    <div className="container">
      <Navbar color="light" light expand="md">
        <NavbarBrand>Todo App</NavbarBrand>
      </Navbar>

      <Button>Learn React</Button>
    </div>
  );
}

export default App;
