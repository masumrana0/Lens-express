import { LogLevel } from "@src/interface/app.interface/config.interface";
import path from "path";

export class LoggerConstant {
  static getLogPath(logLevel: LogLevel): string {
    switch (logLevel) {
      case "info":
        return this.infoPath();
      case "warn":
        return this.warnPath();
      case "error":
        return this.errorPath();
      case "debug":
        return this.debugPath();
      case "verbose":
        return this.verbosePath();
      case "silly":
        return this.sillyPath();
      case "http":
        return this.httpPath();
      default:
        return this.infoPath();
    }
  }

  private static infoPath() {
    return path.join(
      process.cwd(),
      "logs",
      "winston",
      "successes",
      "%DATE%-success.log"
    );
  }

  private static warnPath() {
    return path.join(
      process.cwd(),
      "logs",
      "winston",
      "warnings",
      "%DATE%-warn.log"
    );
  }

  private static errorPath() {
    return path.join(
      process.cwd(),
      "logs",
      "winston",
      "errors",
      "%DATE%-error.log"
    );
  }
  
  private static debugPath() {
    return path.join(
      process.cwd(),
      "logs",
      "winston",
      "debugs",
      "%DATE%-debug.log"
    );
  }

  private static verbosePath() {
    return path.join(
      process.cwd(),
      "logs",
      "winston",
      "verboses",
      "%DATE%-verbose.log"
    );
  }

  private static sillyPath() {
    return path.join(
      process.cwd(),
      "logs",
      "winston",
      "sillies",
      "%DATE%-silly.log"
    );
  }

  private static httpPath() {
    return path.join(
      process.cwd(),
      "logs",
      "winston",
      "https",
      "%DATE%-http.log"
    );
  }
}
