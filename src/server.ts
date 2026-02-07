import "reflect-metadata";
import { Server } from "http";
import app from "./app";
import appConfig from "./config";
import Logger from "./lib/logger/logger";

process.on("uncaughtException", (err) => {
  Logger.error(
    "UNCAUGHT EXCEPTION! Detected 💥 Shutting down...",
    `${__filename}`,
  );
  Logger.error(err, `${__filename}`);

  process.exit(1);
});

const port = appConfig.server.port;
let server: Server;

async function startServer() {
  Logger.info(
    `Starting server in ${appConfig.AppEnvironment} mode...`,
    `${__filename}`,
  );
  try {
    server = app.listen(port, () => {
      Logger.info(`Server is running on port ${port}`, `${__filename}`);
    });
  } catch (err) {
    Logger.error(err, `${__filename}`);
    process.exit(1);
  }
}

startServer();
