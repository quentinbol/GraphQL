import { gql } from '@apollo/client';

export const STUDENT_FIELDS = gql`
  fragment StudentFields on Student {
    id
    name
    completedCredits
    academicStanding
  }
`;

export const GET_ALL_STUDENTS = gql`
  ${STUDENT_FIELDS}
  query GetAllStudents {
    students {
      ...StudentFields
    }
    studentCount
  }
`;

export const GET_STUDENT_BY_ID = gql`
  ${STUDENT_FIELDS}
  query GetStudentById($id: ID!) {
    student(id: $id) {
      ...StudentFields
    }
  }
`;

export const ADD_STUDENT = gql`
  ${STUDENT_FIELDS}
  mutation AddStudent($input: CreateStudentInput!) {
    addStudent(input: $input) {
      ...StudentFields
    }
  }
`;
