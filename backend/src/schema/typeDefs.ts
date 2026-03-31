export const typeDefs = `#graphql
  type Student {
    id: ID!
    name: String!
    completedCredits: Int!
    academicStanding: String!
  }

  input CreateStudentInput {
    name: String!
    completedCredits: Int!
  }

  type Query {
    students: [Student!]!

    student(id: ID!): Student

    studentCount: Int!
  }

  type Mutation {
    addStudent(input: CreateStudentInput!): Student!
  }
`;
