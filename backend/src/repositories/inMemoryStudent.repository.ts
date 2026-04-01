import { IStudentRepository } from './IStudent.repository';
import { Student, CreateStudentDto } from '../types/student.types';

export class InMemoryStudentRepository implements IStudentRepository {
  private students: Student[] = [
    { id: '1', name: 'Alice Martin',  completedCredits: 95 },
    { id: '2', name: 'Bob Tremblay',  completedCredits: 62 },
    { id: '3', name: 'Clara Dubois',  completedCredits: 30 },
    { id: '4', name: 'David Chen',    completedCredits: 15 },
    { id: '5', name: 'Emma Lavoie',   completedCredits: 78 },
  ];

  private nextId = 6;

  async findAll(): Promise<Student[]> {
    return [...this.students];
  }

  async findById(id: string): Promise<Student | undefined> {
    return this.students.find((s) => s.id === id);
  }

  async findByName(name: string): Promise<Student | undefined> {
    return this.students.find(
      (s) => s.name.toLowerCase() === name.trim().toLowerCase()
    );
  }

  async create(dto: CreateStudentDto): Promise<Student> {
    const student: Student = {
      id: String(this.nextId++),
      name: dto.name.trim(),
      completedCredits: dto.completedCredits,
    };
    this.students.push(student);
  
    return student;
  }

  async count(): Promise<number> {
    return this.students.length;
  }
}
