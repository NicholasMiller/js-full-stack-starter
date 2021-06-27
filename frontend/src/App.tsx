import React from 'react';
import './App.scss';
import { Navbar, NavbarBrand, Button } from 'reactstrap';
import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay';
import { AppQuery } from './__generated__/AppQuery.graphql';

function App() {
  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        todoItems {
          id
          item
        }
      }
    `,
    {}
  );

  if (!data) {
    return null;
  } else {
    console.log(data.todoItems);
  }

  return (
    <div className="container">
      <Navbar color="light" light expand="md">
        <NavbarBrand>Todo App</NavbarBrand>
      </Navbar>
      <ul>
        {data.todoItems?.map((i) => (
          <li>{i?.item}</li>
        ))}
      </ul>
      <Button>Learn React</Button>
    </div>
  );
}

export default App;
