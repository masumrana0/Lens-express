 
import { ZodError } from "zod";
import status from "http-status";
import { IErrorResponse } from "@src/interface/app.interface";

function handleZodError(error: ZodError): IErrorResponse{
  const errorMessages = error.issues.map((issue) => {
    return {
      path: issue.path.join("."),
      message: issue.message,
    };
  });

  const statusCode = status.BAD_REQUEST;
  const message = "Validation Error";
  return {
    statusCode,
    message,
    errorMessages,
  };
}

export default handleZodError;
