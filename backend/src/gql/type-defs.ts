import { gql } from 'apollo-server';

export default gql`
  scalar Void
  scalar DateTime

  type TodoItem {
    id: String!
    item: String!
    createdAt: DateTime!
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
  }

  type Mutation {
    login(input: LoginMutationInput!): String
    addTodoItem(input: AddTodoItemMutationInput!): TodoItem
    removeTodoItem(id: String!): Void
  }
`;
