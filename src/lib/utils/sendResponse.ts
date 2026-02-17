import { IApiResponse } from "@src/interface/app.interface";
import { Response } from "express";
import status from "http-status";

const sendResponse = <T>(
  res: Response,
  responseData: IApiResponse<T>,
): void => {
  // Build base response
  const response: IApiResponse<T> = {
    statusCode: responseData.statusCode ?? status.OK,
    success: responseData.success ?? true,
    message: responseData.message,
    data: responseData.data,
  };

  // Add meta only if it exists
  if (responseData.meta) {
    response.meta = responseData.meta;
  }

  res.status(response.statusCode).json(response);
};

export default sendResponse;
