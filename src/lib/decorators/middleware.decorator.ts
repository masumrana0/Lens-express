import { CONTROLLER_MIDDLEWARE_KEY, MIDDLEWARE_KEY } from "@src/constants";
import { RequestHandler } from "express";

function Use(middleware: RequestHandler | RequestHandler[]) {
  return function (target: any, propertyKey?: string | symbol) {
    const middlewares = Array.isArray(middleware) ? middleware : [middleware];

    // method level  middlewares
    if (propertyKey && typeof propertyKey === "string") {
      const existingMiddlewares =
        Reflect.getMetadata(MIDDLEWARE_KEY, target, propertyKey) || [];

      const combinedMiddlewares = [...existingMiddlewares, ...middlewares];

      Reflect.defineMetadata(
        MIDDLEWARE_KEY,
        combinedMiddlewares,
        target,
        propertyKey
      );
    }

    // class level middlewares
    const existingMiddlewares =
      Reflect.getMetadata(CONTROLLER_MIDDLEWARE_KEY, target) || [];

    const combinedMiddlewares = [...existingMiddlewares, ...middlewares];

    Reflect.defineMetadata(
      CONTROLLER_MIDDLEWARE_KEY,
      combinedMiddlewares,
      target
    );
  };
}

export default Use;
