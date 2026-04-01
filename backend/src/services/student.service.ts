import { IStudentRepository } from '../repositories/IStudent.repository';
import { StudentValidator }   from '../validators/student.validator';
import { AcademicStanding } from '../types/student.types';
import { NotFoundError, ConflictError } from '../errors/AppError';
import { Student, CreateStudentDto }    from '../types/student.types';

export class StudentService {
  constructor(private readonly repository: IStudentRepository) {}

  async findAll(): Promise<Student[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Student> {
    const student = await this.repository.findById(id);
    if (!student)
      throw new NotFoundError('Student', id);

    return student;
  }

  async add(dto: CreateStudentDto): Promise<Student> {
    StudentValidator.validate(dto);

    const existing = await this.repository.findByName(dto.name);
    if (existing) {
      throw new ConflictError(`A student named "${dto.name.trim()}" already exists`);
    }

    return this.repository.create(dto);
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  getAcademicStanding(student: Student): AcademicStanding {
    if (student.completedCredits >= 120) {
      return AcademicStanding.Senior;
    } else if (student.completedCredits >= 90) {
      return AcademicStanding.Junior;
    } else if (student.completedCredits >= 60) {
      return AcademicStanding.Sophomore;
    } else {
      return AcademicStanding.Freshman;
    }
  }
}
