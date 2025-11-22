export interface IDatabaseConfig {
  url: string;
  name?: string;
  poolSize?: number;
}

export interface IServerConfig {
  port: number;
  apiUrl?: string;
  logLevel: LogLevel;
}

export interface ISecurityConfig {
  jwtSecret: string;
  jwtExpiresIn: string;
  corsOrigins: string[];
  allowedHosts?: string[];
}

export interface IPaginationConfig {
  defaultLimit: number;
  pageQueryKey: string;
  sizeQueryKey: string;
}

export interface IDefaultConfig {
  pagination: IPaginationConfig;
  urlPrefixes: {
    api: string;
  };
}

export interface IAppConfigOptions {
  database: IDatabaseConfig;
  security: ISecurityConfig;
  server: IServerConfig;
  defaultConfig: IDefaultConfig;
}

export type Environment = "development" | "staging" | "production";
export type LogLevel =
  | "error"
  | "warn"
  | "info"
  | "http"
  | "verbose"
  | "debug"
  | "silly";
