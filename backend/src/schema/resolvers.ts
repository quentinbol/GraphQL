import { StudentController } from '../controllers/student.controller';
import { Student, StudentModel } from '../models/Student';

export const resolvers = {
  Query: {
    students: (): Student[] => {
      return StudentController.getAllStudents();
    },

    student: (_: unknown, args: { id: string }): Student => {
      return StudentController.getStudentById(args.id);
    },

    studentCount: (): number => {
      return StudentController.getStudentCount();
    },
  },

  Mutation: {
    addStudent: (
      _: unknown,
      args: { input: { name: string; completedCredits: number } }
    ): Student => {
      return StudentController.addStudent(args.input);
    },
  },

  Student: {
    academicStanding: (parent: Student): string => {
      const model = new StudentModel(parent);
      return model.getAcademicStanding();
    },
  },
};
