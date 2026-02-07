import { RequestHandler } from "express";

export type HTTPMethod = "get" | "post" | "put" | "delete" | "patch";
export type RouterDefinition = {
  method: HTTPMethod;
  path: string;
  middlewares: RequestHandler[];
  methodName: string;
};

export type ControllerMetaData = {
  basePath: string;
  routes: RouterDefinition[];
  middlewares: RequestHandler[];
};
