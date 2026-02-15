import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import appConfig from "./config";
import globalErrorHandler from "./lib/middlewares/globalErrorHandler";
import registerController from "./lib/core/registerController";
import { UserController } from "./app/modules/user/user.controller";
import cookieParser from "cookie-parser";
import { AuthController } from "./app/modules/auth/auth.controller";
import { EmployeeController } from "./app/modules/employee/employee.controller";
import SiteController from "./app/modules/site/site.controller";
import AttendanceController from "./app/modules/attendance/attendance.controller";

export const createApp = () => {
  const app: Application = express();
  // Middleware
  app.use(express.json());
  app.use(cookieParser());
  app.set("trust proxy", true);

  app.use(cors({ origin: appConfig.security.corsOrigins, credentials: true }));
  app.use(express.urlencoded({ extended: true }));

  // Register controllers
  registerController(app, [
    AuthController,
    UserController,
    EmployeeController,
    SiteController,
    AttendanceController,
  ]);

  // global error handler
  app.use(globalErrorHandler);

  // handle not found routes
  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  return app;
};
