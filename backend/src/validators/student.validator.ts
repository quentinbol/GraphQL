import { CreateStudentDto } from '../types/student.types';
import { ValidationError } from '../errors/AppError';

export class StudentValidator {
  static validate(dto: CreateStudentDto): void {
    if (!dto.name || dto.name.trim().length < 2) {
      throw new ValidationError('Student name must be at least 2 characters long.');
    }

    if (dto.name.trim().length > 100) {
      throw new ValidationError('Student name must not exceed 100 characters.');
    }

    if (!Number.isInteger(dto.completedCredits)) {
      throw new ValidationError('Completed credits must be an integer.');
    }

    if (dto.completedCredits < 0) {
      throw new ValidationError('Completed credits cannot be negative.');
    }

    if (dto.completedCredits > 200) {
      throw new ValidationError('Completed credits cannot exceed 200.');
    }
  }
}
