/**
 * Title: 'Advanced Winston Logger Service'
 * Description: 'Advanced Winston-based logger with daily rotation, multiple log levels,
 * and automatic file management. Features include:
 * - Dynamic logger creation for each log operation
 * - Daily rotating file logs with compression and cleanup
 * - Console and file output with custom formatting
 * - Support for all Winston log levels (error, warn, info, debug, verbose, silly, http)
 * - Automatic log file organization by level
 * - Time-based log rotation with 14-day retention
 * - 20MB max file size with gzip compression
 * - Custom timestamp formatting (HH:MM:SS)
 * - Configurable label names for log categorization'
 * Author: 'Masum Rana'
 * Date: 20-11-2025
 */

import { LogLevel } from "@src/interface/config.interface";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { LoggerConstant } from "./logger.essential";
import path from "path";

const { combine, timestamp, label, printf } = format;

export default class Logger {
  // universal Logger maker
  private static createDynamicLogger(
    message: unknown,
    level: LogLevel,
    labelName: string = ""
  ) {
    return createLogger({
      level: level,
      format: combine(
        label({ label: `${path.join(".", labelName)}` }),
        timestamp(),
        this.myFormat
      ),
      transports: [
        new transports.Console(),
        new DailyRotateFile({
          filename: LoggerConstant.getLogPath(labelName as LogLevel),
          datePattern: "HH-MM-DD-YYYY",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
        }),
      ],
    });
  }

  static error(error: unknown, labelName: string = "error") {
    const logger = Logger.createDynamicLogger(error, "error", labelName);
    logger.error(error);
  }

  static warn(message: string | unknown, labelName: string = "warn") {
    const logger = Logger.createDynamicLogger(message, "warn", labelName);
    logger.warn(message);
  }

  static info(message: string | unknown, labelName: string = "info") {
    const logger = Logger.createDynamicLogger(message, "info", labelName);
    logger.info(message);
  }

  static debug(message: string | unknown, labelName: string = "debug") {
    const logger = Logger.createDynamicLogger(message, "debug", labelName);
    logger.debug(message);
  }

  static verbose(message: string | unknown, labelName: string = "verbose") {
    const logger = Logger.createDynamicLogger(message, "verbose", labelName);
    logger.verbose(message);
  }

  static silly(message: string | unknown, labelName: string = "silly") {
    const logger = Logger.createDynamicLogger(message, "silly", labelName);
    logger.silly(message);
  }

  static http(message: string | unknown, labelName: string = "http") {
    const logger = Logger.createDynamicLogger(message, "http", labelName);
    logger.http(message);
  }

  private static myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp as string);

    let hour = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12;

    const formattedHour = hour.toString().padStart(2, "0");

    const formattedTime = `${formattedHour}:${minutes}:${seconds} ${ampm}`;

    return `[${formattedTime}] ${level} [${label}] : ${message}`;
  });
}
