// /**
//  * Title: 'Router Decorator'
//  * Description: 'Decorators for defining HTTP routes with Express middleware support'
//  * Author: 'Masum Rana'
//  * Date: 21-11-2025
//  */

import { ROUTE_KEY } from "@src/constants";
import {
  HTTPMethod,
  RouterDefinition,
} from "@src/interface/app.interface/metadata.interface";
import { RequestHandler } from "express";
import catchAsync from "../utils/catchAsync";

export function Route(
  method: HTTPMethod,
  path: string,
  middleware: RequestHandler[] | RequestHandler,
) {
  const middlewares = Array.isArray(middleware) ? middleware : [middleware];

  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const existingRoutes: RouterDefinition[] =
      Reflect.getMetadata(ROUTE_KEY, target) || [];

    const routeDefinition: RouterDefinition = {
      method,
      path,
      middlewares,
      methodName: propertyKey.toString(),
    };

    const updatedRoutes = [...existingRoutes, routeDefinition];

    Reflect.defineMetadata(ROUTE_KEY, updatedRoutes, target);
    // Wrap the original method with catchAsync for error handling
    descriptor.value = catchAsync(descriptor.value);

    return descriptor;
  };
}

export const Get = (
  path: string,
  middleware: RequestHandler[] | RequestHandler = [],
) => {
  return Route("get", path, middleware);
};

export const Post = (
  path: string,
  middleware: RequestHandler[] | RequestHandler = [],
) => {
  return Route("post", path, middleware);
};

export const Put = (
  path: string,
  middleware: RequestHandler[] | RequestHandler = [],
) => {
  return Route("put", path, middleware);
};

export const Patch = (
  path: string,
  middleware: RequestHandler[] | RequestHandler = [],
) => {
  return Route("patch", path, middleware);
};

export const Delete = (
  path: string,
  middleware: RequestHandler[] | RequestHandler = [],
) => {
  return Route("delete", path, middleware);
};
