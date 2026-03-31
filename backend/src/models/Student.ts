export interface Student {
  id: string;
  name: string;
  completedCredits: number;
}

export interface CreateStudentDto {
  name: string;
  completedCredits: number;
}

export enum AcademicStanding {
  Freshman = 'Freshman',
  Sophomore = 'Sophomore',
  Junior = 'Junior',
  Senior = 'Senior',
}

export class StudentModel {
  private id: string;
  private name: string;
  private completedCredits: number;

  constructor(data: Student) {
    this.id = data.id;
    this.name = data.name;
    this.completedCredits = data.completedCredits;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getCompletedCredits(): number {
    return this.completedCredits;
  }

  toJSON(): Student {
    return {
      id: this.id,
      name: this.name,
      completedCredits: this.completedCredits,
    };
  }

  getAcademicStanding(): AcademicStanding {
    switch (true) {
      case this.completedCredits < 30:
        return AcademicStanding.Freshman;
      case this.completedCredits < 60:
        return AcademicStanding.Sophomore;
      case this.completedCredits < 90:
        return AcademicStanding.Junior;
      default:
        return AcademicStanding.Senior;
    }
  }

  static validate(data: CreateStudentDto): void {
    if (!data.name || data.name.trim().length < 2) {
      throw new Error('Student name must be at least 2 characters long.');
    }
    if (data.completedCredits < 0) {
      throw new Error('Completed credits cannot be negative.');
    }
    if (data.completedCredits > 200) {
      throw new Error('Completed credits cannot exceed 200.');
    }
  }
}
