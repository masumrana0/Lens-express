/**
 * Title: 'Global Error Handler Middleware'
 * Description: 'Centralized error handling middleware that processes all application errors, formats them consistently, and provides appropriate         *               responses with detailed error information for development and production environments.'
 * Author: 'Masum Rana'
 * Date: 20-11-2025
 */

import appConfig from "@src/config";
import ApiError from "@src/lib/errors/apiError";
import handleDrizzleError from "@src/lib/errors/handleDrizzleError";
import handleZodError from "@src/lib/errors/handleZodError";
import { IErrorMessage } from "@src/interface/app.interface/error.interface";
import Logger from "@src/lib/logger/logger";
import { DrizzleError } from "drizzle-orm";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

const globalErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  appConfig.AppEnvironment === "development"
    ? console.log(`😢`, { error })
    : Logger.error(error, `${__filename}`);

  let statusCode = 500;
  let message = `Something went wrong..!`;
  let errorMessages: IErrorMessage[] = [];

  if (error instanceof DrizzleError) {
    message = error.message;
    errorMessages = handleDrizzleError(error);
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = error.message;
    errorMessages = simplifiedError.errorMessages || [];
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack:
      appConfig.AppEnvironment !== "production"
        ? error instanceof Error
          ? error.stack
          : undefined
        : undefined,
  });
};

export default globalErrorHandler;
