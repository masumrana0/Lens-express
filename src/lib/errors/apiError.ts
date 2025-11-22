import status from "http-status";
class ApiError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (this.stack) {
      this.stack = this.stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;

export class ApiErrors {
  static BadRequest(message: string): ApiError {
    return new ApiError(status.BAD_REQUEST, message);
  }
  static Unauthorized(message: string): ApiError {
    return new ApiError(status.UNAUTHORIZED, message);
  }
  static Forbidden(message: string): ApiError {
    return new ApiError(status.FORBIDDEN, message);
  }
  static NotFound(message: string): ApiError {
    return new ApiError(status.NOT_FOUND, message);
  }
  static InternalServerError(message: string): ApiError {
    return new ApiError(status.INTERNAL_SERVER_ERROR, message);
  }
}
