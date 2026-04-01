import { GraphQLError } from 'graphql';

export enum ErrorCode {
  NOT_FOUND = 'NOT_FOUND',
  BAD_USER_INPUT = 'BAD_USER_INPUT',
  CONFLICT = 'CONFLICT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export class AppError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = this.constructor.name;
  }

  toGraphQLError(): GraphQLError {
    return new GraphQLError(this.message, {
      extensions: { code: this.code },
    });
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(`${resource} with ID "${id}" not found.`, ErrorCode.NOT_FOUND);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, ErrorCode.BAD_USER_INPUT);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, ErrorCode.CONFLICT);
  }
}
