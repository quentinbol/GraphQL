import { GraphQLError } from 'graphql';
import { studentController } from '../config/container.config';
import { CreateStudentDto, Student } from '../types/student.types';
import { AppError, ErrorCode } from '../errors/AppError';

function handleError(err: unknown): never {
  if (err instanceof AppError)
    throw err.toGraphQLError();

  if (err instanceof Error)
    throw new GraphQLError(err.message, {
      extensions: { code: ErrorCode.INTERNAL_SERVER_ERROR },
    });

  throw new GraphQLError('An unexpected error occurred.', {
    extensions: { code: ErrorCode.INTERNAL_SERVER_ERROR },
  });
}

export const resolvers = {
  Query: {
    students: async (): Promise<Student[]> => {
      try { 
        return await studentController.getAllStudents();
      } catch (e) { 
        handleError(e); 
      }
    },

    student: async (_: unknown, args: { id: string }): Promise<Student> => {
      try {
        return await studentController.getStudentById(args.id);
      } catch (e) {
        handleError(e);
      }
    },

    studentCount: async (): Promise<number> => {
      try {
        return await studentController.getStudentCount();
      } catch (e) {
        handleError(e);
      }
    },
  },

  Mutation: {
    addStudent: async (
      _: unknown,
      args: { input: CreateStudentDto }
    ): Promise<Student> => {
      try {
        return await studentController.addStudent(args.input);
      } catch (e) { 
        handleError(e);
      }
    },
  },


  Student: {
    academicStanding: (parent: Student): string =>
      studentController.getAcademicStanding(parent),
  },
};
