/**
 * Title: 'App Config Made By Masum Rana'
 * Description: 'Centralized configuration management system for the application. This singleton class handles loading and parsing of environment variables, providing type-safe  *access to database, security, and server configurations. It validates required environment variables on startup and offers convenient methods to check the current application   *environment.'
 * Author: 'Masum Rana'
 * Date: 20-11-2025
 */

import {
  Environment,
  IAppConfigOptions,
  IDatabaseConfig,
  IDefaultConfig,
  ISecurityConfig,
  IServerConfig,
  LogLevel,
} from "@src/interface/app.interface/config.interface";
import dotenv from "dotenv";

// load environment variables from .env file
dotenv.config();

const requiredEnvVars = [
  "DATABASE_URL",
  "DATABASE_NAME",
  "DATABASE_POOL_SIZE",
  "PORT",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "JWT_REFRESH_SECRET",
  "JWT_REFRESH_EXPIRES_IN",
  "SALT_ROUNDS",
];

class AppConfig {
  private static instance: AppConfig;
  private readonly config: IAppConfigOptions;

  private constructor() {
    this.config = this.loadOptions();
  }

  // Provides access to the singleton instance of AppConfig.
  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  // Loads and parses configuration options from environment variables.
  private loadOptions(): IAppConfigOptions {
    this.loadRequiredEnvVars();
    return {
      database: {
        url: this.getEnv("DATABASE_URL", true) as string,
        name: this.getEnv("DATABASE_NAME", true) as string,
        poolSize: parseInt(
          this.getEnv("DATABASE_POOL_SIZE", true) as string,
          10,
        ),
      },

      security: {
        jwtSecret: this.getEnv("JWT_SECRET", true) as string,
        jwtExpiresIn: this.getEnv("JWT_EXPIRES_IN", true) as string,
        jwtRefreshSecret: this.getEnv("JWT_REFRESH_SECRET", true) as string,
        jwtRefreshExpiresIn: this.getEnv("JWT_REFRESH_EXPIRES_IN", true) as string,
        corsOrigins: this.parseCorsOrigins(),
        allowedHosts: this.parseAllowedHosts(),
        saltRounds: parseInt(this.getEnv("SALT_ROUNDS", true) as string),
      },

      server: {
        port: parseInt(this.getEnv("PORT", true) as string, 10),
        logLevel: this.parseLogLevel(),
      },

      defaultConfig: {
        pagination: {
          defaultLimit: parseInt(
            this.getEnv("DEFAULT_PAGINATION_LIMIT") || "10",
            10,
          ),
          pageQueryKey: "page",
          sizeQueryKey: "size",
        },

        urlPrefixes: {
          api: "/api/v1",
        },
      },
    };
  }

  // Retrieves the value of an environment variable.
  getEnv(name: string, required: boolean = false): string | undefined {
    const value = process.env[name];
    if (required && (value === undefined || value === "")) {
      throw new Error(`Environment variable ${name} is required but not set.`);
    }
    return value;
  }

  // validates the presence of all required environment variables.
  private loadRequiredEnvVars() {
    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName],
    );

    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(", ")}`,
      );
    }
  }

  //   parses log level from environment variable.
  private parseLogLevel(): LogLevel {
    const level = (this.getEnv("LOG_LEVEL") || "debug") as LogLevel;
    const validLevels = ["debug", "info", "warn", "error"];

    if (!validLevels.includes(level)) {
      return "info";
    }

    return level as LogLevel;
  }

  //    cors origins from environment variable.
  private parseCorsOrigins(): string[] {
    const origins = this.getEnv("CORS_ORIGINS") || "*";
    return origins === "*"
      ? ["*"]
      : origins.split(",").map((origin) => origin.trim());
  }
  //   allowed hosts from environment variable.
  private parseAllowedHosts(): string[] {
    const hosts = this.getEnv("ALLOWED_HOSTS");
    return hosts ? hosts.split(",").map((host) => host.trim()) : [];
  }

  // gets the current application environment.
  get AppEnvironment(): Environment {
    return (this.getEnv("NODE_ENV") || "development") as Environment;
  }

  get isDevelopment(): boolean {
    return this.AppEnvironment === "development";
  }

  get isStaging(): boolean {
    return this.AppEnvironment === "staging";
  }

  get isProduction(): boolean {
    return this.AppEnvironment === "production";
  }

  get database(): IDatabaseConfig {
    return this.config.database;
  }

  get security(): ISecurityConfig {
    return this.config.security;
  }

  get server(): IServerConfig {
    return this.config.server;
  }
  get defaultConfig(): IDefaultConfig {
    return this.config.defaultConfig;
  }
}

const appConfig = AppConfig.getInstance();
export default appConfig;
