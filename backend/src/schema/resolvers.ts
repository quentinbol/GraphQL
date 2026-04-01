import { StudentController } from '../controllers/student.controller';
import { Student, StudentModel } from '../models/Student';

const studentController = new StudentController();

export const resolvers = {
  Query: {
    students: (): Student[] => {
      return studentController.getAllStudents();
    },

    student: (_: unknown, args: { id: string }): Student => {
      return studentController.getStudentById(args.id);
    },

    studentCount: (): number => {
      return studentController.getStudentCount();
    },
  },

  Mutation: {
    addStudent: (
      _: unknown,
      args: { input: { name: string; completedCredits: number } }
    ): Student => {
      return studentController.addStudent(args.input);
    },
  },

  Student: {
    academicStanding: (parent: Student): string => {
      const model = new StudentModel(parent);
      return model.getAcademicStanding();
    },
  },
};
