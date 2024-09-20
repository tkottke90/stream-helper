type MetadataType = Record<string, unknown>;

export class HTTPError<T extends MetadataType> extends Error {
  code: number;
  details?: T;

  constructor(message: string, code: number, details?: T) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

export class BadRequestError<T extends MetadataType> extends HTTPError<T> {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedError<T extends MetadataType> extends HTTPError<T> {
  constructor(message: string) {
    super(message, 401);
  }
}

export class ForbiddenError<T extends MetadataType> extends HTTPError<T> {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFoundError<T extends MetadataType> extends HTTPError<T> {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnprocessableError<T extends MetadataType> extends HTTPError<T> {
  constructor(message: string) {
    super(message, 422);
  }
}

export class GeneralError<T extends MetadataType> extends HTTPError<T> {
  constructor(message: string) {
    super(message, 500);
  }
}
