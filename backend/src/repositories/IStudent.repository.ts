import { Student, CreateStudentDto } from '../types/student.types';

export interface IStudentRepository {
  findAll(): Promise<Student[]>;
  findById(id: string): Promise<Student | undefined>;
  findByName(name: string): Promise<Student | undefined>;
  create(dto: CreateStudentDto): Promise<Student>;
  count(): Promise<number>;
}
