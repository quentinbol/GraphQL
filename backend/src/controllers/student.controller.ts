// CONTROLLER: Business logic layer between schema and data store

import { Student, CreateStudentDto } from '../models/Student';
import { StudentService } from '../services/student.service';

export class StudentController {
  private studentService = new StudentService();

  getAllStudents(): Student[] {
    return this.studentService.findAll();
  }

  getStudentById(id: string): Student {
    return this.studentService.findById(id);
  }

  addStudent(input: CreateStudentDto): Student {
    return this.studentService.add(input);
  }

  getStudentCount(): number {
    return this.studentService.count();
  }
}
