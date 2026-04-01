import { model, Schema } from 'mongoose';
import { Student } from '../types/student.types';

export enum AcademicStanding {
  Freshman = 'Freshman',
  Sophomore = 'Sophomore',
  Junior = 'Junior',
  Senior = 'Senior',
}

const StudentModel = new Schema<Student>({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  completedCredits: {
    type: Number,
    required: true
  },
});

export class MockStudentModel {
  constructor(private readonly data: Student) {}

  get id(): string {
    return this.data.id;
  }

  get name(): string {
    return this.data.name;
  }

  get completedCredits(): number {
    return this.data.completedCredits;
  }

  get getAcademicStanding(): AcademicStanding {
    const c = this.data.completedCredits;

    if (c >= 90)
      return AcademicStanding.Senior;
    if (c >= 60)
      return AcademicStanding.Junior;
    if (c >= 30)
      return AcademicStanding.Sophomore;

    return AcademicStanding.Freshman;
  }

  toJSON(): Student {
    return { ...this.data };
  }
}

export const StudentSchema = model<Student>('Student', StudentModel);