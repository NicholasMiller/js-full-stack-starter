import { gql } from 'apollo-server';

export default gql`
  scalar Void

  type Query {
    """
    Test Message.
    """
    testMessage: String!
  }

  type TodoItem {
    id: Int!
    item: String!
    displayOrder: Int!
  }

  type Mutation {
    login(email: String!, password: String!): String
    addTodoItem(item: String!, displayOrder: Int!): TodoItem
    removeTodoItem(id: Int!): Void
  }
`;
