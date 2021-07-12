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

  input LoginMutationInput {
    email: String!
    password: String!
  }

  input AddTodoItemMutationInput {
    item: String!
    displayOrder: Int!
  }

  type Mutation {
    login(input: LoginMutationInput!): String
    addTodoItem(input: AddTodoItemMutationInput!): TodoItem
    removeTodoItem(id: String!): Void
  }
`;
