import type {
  AcademicStanding,
  Student as BaseStudent,
  CreateStudentDto,
} from '@shared/types';

export interface Student extends BaseStudent {
  academicStanding: AcademicStanding;
}

export interface GetStudentsData {
  students: Student[];
}

export interface GetStudentData {
  student: Student | null;
}

export interface AddStudentData {
  addStudent: Student;
}

export interface StudentCountData {
  studentCount: number;
}

export type CreateStudentInput = CreateStudentDto;
