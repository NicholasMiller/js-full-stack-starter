import { gql } from 'apollo-server';

export default gql`
  scalar Void

  type TodoItem {
    id: String!
    item: String!
    displayOrder: Int!
  }

  type Query {
    todoItems: [TodoItem]
  }

  type Mutation {
    login(email: String!, password: String!): String
    addTodoItem(item: String!, displayOrder: Int!): TodoItem
    removeTodoItem(id: String!): Void
  }
`;
