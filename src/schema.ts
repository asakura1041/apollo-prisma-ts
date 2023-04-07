import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    projects: [Project!]!
    tasks: [Task!]!
  }

  type Project {
    id: ID!
    name: String
    owner: User!
    tasks: [Task!]!
  }

  type Task {
    id: ID!
    title: String!
    completed: Boolean!
    project: Project!
    assignee: User
    labels: [Label!]!
  }

  type Label {
    id: ID!
    name: String!
    tasks: [Task!]!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    projects: [Project!]!
    project(id: ID!): Project
    tasks: [Task!]!
    task(id: ID!): Task
    labels: [Label!]!
    label(id: ID!): Label
  }

  input CreateUserInput {
    email: String!
    password: String!
  }

  input CreateProjectInput {
    name: String!
    ownerId: ID!
  }

  input CreateTaskInput {
    title: String!
    projectId: ID!
    assigneeId: ID
  }

  input CreateLabelInput {
    name: String!
  }

  input UpdateUserInput {
    email: String
    password: String
  }

  input UpdateProjectInput {
    name: String
  }

  input UpdateTaskInput {
    title: String
    completed: Boolean
    projectId: ID
    assigneeId: ID
  }

  input UpdateLabelInput {
    name: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    createProject(input: CreateProjectInput!): Project!
    createTask(input: CreateTaskInput!): Task!
    createLabel(input: CreateLabelInput!): Label!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    updateProject(id: ID!, input: UpdateProjectInput!): Project!
    updateTask(id: ID!, input: UpdateTaskInput!): Task!
    updateLabel(id: ID!, input: UpdateLabelInput!): Label!
    deleteUser(id: ID!): User!
    deleteProject(id: ID!): Project!
    deleteTask(id: ID!): Task!
    deleteLabel(id: ID!): Label!
  }
`;
