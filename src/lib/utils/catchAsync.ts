import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler) => {
  return async function (
    this: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await fn.call(this, req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
