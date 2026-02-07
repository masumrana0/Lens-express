import express, { Application } from "express";
import cors from "cors";
import appConfig from "./config";
import globalErrorHandler from "./lib/middlewares/globalErrorHandler";
import registerController from "./lib/core/registerController";

const app: Application = express();

// Middleware
app.use(express.json());

app.use(cors({ origin: appConfig.security.corsOrigins, credentials: true }));
app.use(express.urlencoded({ extended: true }));

// Register controllers
registerController(app, []);
// global error handler
app.use(globalErrorHandler);

export default app;
