import { gql } from 'apollo-server';

export default gql`
  scalar Void
  scalar DateTime

  type Viewer {
    firstName: String!
    lastName: String!
    email: String!
    profilePhotoUrl: String
  }

  type TodoItem {
    id: ID!
    item: String!
    createdAt: DateTime!
  }

  type Query {
    todoItems: [TodoItem]
    viewer: Viewer
  }

  input LoginMutationInput {
    email: String!
    password: String!
  }

  input AddTodoItemMutationInput {
    item: String!
  }

  input CompleteTodoItemMutationInput {
    id: ID!
  }

  type Mutation {
    login(input: LoginMutationInput!): String
    addTodoItem(input: AddTodoItemMutationInput!): TodoItem
    completeTodoItem(id: ID!): TodoItem
  }
`;
