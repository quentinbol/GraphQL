export const typeDefs = `#graphql
  """
  Represents a student in the system
  """
  type Student {
    id: ID!
    name: String!
    completedCredits: Int!
    academicStanding: String!
  }

  """
  Input type for creating a new student
  """
  input CreateStudentInput {
    name: String!
    completedCredits: Int!
  }

  """
  Root Query type
  """
  type Query {
    """
    Retrieve all students
    """
    students: [Student!]!

    """
    Retrieve a single student by their ID
    """
    student(id: ID!): Student

    """
    Get total count of students
    """
    studentCount: Int!
  }

  """
  Root Mutation type
  """
  type Mutation {
    """
    Add a new student to the system
    """
    addStudent(input: CreateStudentInput!): Student!
  }
`;
