import { StudentService } from '../services/student.service';
import { Student, CreateStudentDto, AcademicStanding } from '../types/student.types';

export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  async getAllStudents(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  async getStudentById(id: string): Promise<Student> {
    return this.studentService.findById(id);
  }

  async addStudent(dto: CreateStudentDto): Promise<Student> {
    return this.studentService.add(dto);
  }

  async getStudentCount(): Promise<number> {
    return this.studentService.count();
  }

  getAcademicStanding(student: Student): AcademicStanding {
    return this.studentService.getAcademicStanding(student);
  }
}
