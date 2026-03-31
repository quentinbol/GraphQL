// Shared TypeScript types for the frontend

export interface Student {
  id: string;
  name: string;
  completedCredits: number;
  academicStanding: string;
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

export interface CreateStudentInput {
  name: string;
  completedCredits: number;
}
