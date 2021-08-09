import { gql } from 'apollo-server';

export default gql`
  scalar Void
  scalar DateTime

  type Viewer {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    profilePhotoUrl: String
  }

  type TodoItem {
    id: ID!
    item: String!
    createdAt: DateTime!
    completedAt: DateTime
    userId: ID!
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
    completeTodoItem(input: CompleteTodoItemMutationInput!): TodoItem
  }
`;
