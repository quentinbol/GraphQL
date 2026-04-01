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
  Senior = 'Senior'
}