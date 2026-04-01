export { AcademicStanding } from '@shared/types';
export type { Student, CreateStudentDto } from '@shared/types';

export interface PaginatedResult<T> {
  items: T[];
  total: number;
}
