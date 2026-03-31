// CONTROLLER: Business logic layer between schema and data store

import { StudentStore } from '../data/studentStore';
import { Student, StudentModel, CreateStudentDto } from '../models/Student';
import { StudentService } from '../services/student.service';

export class StudentController {
  private static studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  static getAllStudents(): Student[] {
    return this.studentService.findAll();
  }

  static getStudentById(id: string): Student {
    return this.studentService.findById(id);
  }

  static addStudent(input: CreateStudentDto): Student {
    return this.studentService.add(input);
  }

  static getStudentCount(): number {
    return this.studentService.count();
  }
}
