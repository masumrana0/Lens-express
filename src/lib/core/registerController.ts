import "reflect-metadata";
import appConfig from "@src/config";
import {
  CONTROLLER_KEY,
  CONTROLLER_MIDDLEWARE_KEY,
  MIDDLEWARE_KEY,
  ROUTE_KEY,
} from "@src/constants";
import { ApiErrors } from "@src/lib/errors/apiError";
import { Constructor } from "@src/interface/app.interface/common.interface";
import {
  ControllerMetaData,
  RouterDefinition,
} from "@src/interface/app.interface/metadata.interface";
import { Application, Router, RequestHandler } from "express";
import { container } from "tsyringe";

/**
 * Registers controllers to an Express app with proper DI and middleware handling.
 * @param app Express application instance
 * @param controllers Array of controller classes
 */
const registerController = (app: Application, controllers: Constructor[]) => {
  controllers.forEach((Controller) => {
    // Resolve the controller using tsyringe
    const controllerInstance = container.resolve(Controller);
    // console.log(`Registering controller: ${Controller.name}`);

    // Gather controller metadata
    const controllerMetaData: ControllerMetaData = {
      basePath: Reflect.getMetadata(CONTROLLER_KEY, Controller),
      routes:
        (Reflect.getMetadata(
          ROUTE_KEY,
          Controller.prototype,
        ) as RouterDefinition[]) || [],
      middlewares:
        Reflect.getMetadata(CONTROLLER_MIDDLEWARE_KEY, Controller) || [],
    };

    // Validate base path
    if (!controllerMetaData.basePath) {
      throw ApiErrors.InternalServerError(
        `[registerController]: Controller ${Controller.name} is missing @Controller decorator`,
      );
    }

    // Validate at least one route
    if (controllerMetaData.routes.length === 0) {
      throw ApiErrors.InternalServerError(
        `[registerController]: Controller ${Controller.name} has no routes defined`,
      );
    }

    // Create a new Express router
    const router = Router();

    // Apply controller-level middlewares
    if (controllerMetaData.middlewares.length > 0) {
      router.use(...(controllerMetaData.middlewares as RequestHandler[]));
    }

    // Register each route
    controllerMetaData.routes.forEach((route) => {
      // Ensure the method exists on the controller instance
      if (!(route.methodName in controllerInstance)) {
        throw ApiErrors.InternalServerError(
          `[registerController]: Method ${route.methodName} not found in controller ${Controller.name}`,
        );
      }

      // Get method-level middlewares
      const methodMiddlewares =
        (Reflect.getMetadata(
          MIDDLEWARE_KEY,
          Controller.prototype,
          route.methodName,
        ) as RequestHandler[]) || [];

      // Combine route-level middlewares from decorator + method-level middlewares
      const allMiddlewares: RequestHandler[] = [
        ...(route.middlewares || []),
        ...methodMiddlewares,
      ];

      // Bind the handler to preserve `this`
      const handler: RequestHandler = (controllerInstance as any)[
        route.methodName
      ].bind(controllerInstance);

      // Register route with Express
      (router as any)[route.method](route.path, ...allMiddlewares, handler);
    });

    // Register router with base path
    app.use(
      appConfig.defaultConfig.urlPrefixes.api + controllerMetaData.basePath,
      router,
    );
  });
};

export default registerController;
