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
    display_order: Int!
  }

  type Mutation {
    login(email: String!, password: String!): String
    addTodoItem(item: String!): TodoItem
    removeTodoItem(id: Int!): Void
  }
`;
