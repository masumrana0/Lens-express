import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import appConfig from "./config";
import globalErrorHandler from "./lib/middlewares/globalErrorHandler";
import registerController from "./lib/core/registerController";
import { UserController } from "./app/modules/user/user.controller";

const app: Application = express();

// Middleware
app.use(express.json());

app.use(cors({ origin: appConfig.security.corsOrigins, credentials: true }));
app.use(express.urlencoded({ extended: true }));

// Register controllers
registerController(app, [UserController]);
// global error handler
app.use(globalErrorHandler);

export default app;
