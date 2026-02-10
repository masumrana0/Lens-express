import { IApiResponse } from "@src/interface/app.interface";
import { Response } from "express";
import status from "http-status";

const sendResponse = <T>(
  res: Response,
  responseData: IApiResponse<T>,
): void => {
  const response = {
    statusCode: responseData.statusCode || status.OK,
    success: true,
    message: responseData.message,
    metadata: responseData.meta,
    data: responseData.data,
  };
  res.status(response.statusCode).json(response);
};

export default sendResponse;
