import appConfig from "@src/config";
import {
  CONTROLLER_KEY,
  CONTROLLER_MIDDLEWARE_KEY,
  MIDDLEWARE_KEY,
  ROUTE_KEY,
} from "@src/constants";
import { ApiErrors } from "@src/lib/errors/apiError";
import { Constructor } from "@src/interface/common.interface";
import {
  ControllerMetaData,
  RouterDefinition,
} from "@src/interface/metadata.interface";
import { Application, Router } from "express";
import { container } from "tsyringe";

const registerController = (app: Application, controllers: Constructor[]) => {
  controllers.forEach((Controller) => {
    const controllerInstance = container.resolve(Controller);

    // gathering metadata
    const controllerMetaData: ControllerMetaData = {
      basePath: Reflect.getMetadata(CONTROLLER_KEY, Controller),
      routes:
        (Reflect.getMetadata(
          ROUTE_KEY,
          Controller.prototype
        ) as RouterDefinition[]) || [],
      middlewares:
        Reflect.getMetadata(CONTROLLER_MIDDLEWARE_KEY, Controller) || [],
    };

    // Ensure the controller has a base path
    if (!controllerMetaData.basePath) {
      throw ApiErrors.InternalServerError(
        `[RegisterController]: Controller ${Controller.name} is missing @Controller decorator`
      );
    }

    // Ensure at least one route is defined
    if (controllerMetaData.routes.length === 0) {
      throw ApiErrors.InternalServerError(
        `[RegisterController]: Controller ${Controller.name} has no routes defined`
      );
    }

    // router registration
    const router = Router();

    // apply controller level middlewares
    if (controllerMetaData.middlewares.length > 0) {
      router.use(...controllerMetaData.middlewares);
    }

    // register each route Method Level
    controllerMetaData.routes.forEach((route) => {
      // Ensure the method exists on the controller instance
      if (!(route.methodName in controllerInstance)) {
        throw ApiErrors.InternalServerError(
          `[RegisterController]: Method ${route.methodName} not found in controller ${Controller.name}`
        );
      }

      const middleware =
        Reflect.getMetadata(
          MIDDLEWARE_KEY,
          Controller.prototype,
          route.methodName
        ) || [];

      // take controller method level middlewares and concat with route level middlewares
      const handler =
        controllerInstance[route.methodName].bind(controllerInstance);
      const allMiddlewares = [...route.middlewares, ...middleware];

      router[route.method](route.path, ...allMiddlewares, handler);
    });

    // Register each controller with its base path
    app.use(
      appConfig.defaultConfig.urlPrefixes.api + controllerMetaData.basePath,
      router
    );
  });
};

export default registerController;
