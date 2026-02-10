import { IErrorMessage } from "./error.interface";

export interface IErrorResponse {
  statusCode: number;
  message: string;
  errorMessages?: IErrorMessage[];
}

export interface IApiResponse<T> {
  statusCode: number;
  success?: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T | null;
}
