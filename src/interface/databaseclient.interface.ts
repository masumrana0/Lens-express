import { drizzle } from "drizzle-orm/node-postgres";
import { PgSchema } from "drizzle-orm/pg-core";

export type DrizzleClient = ReturnType<
  typeof drizzle<Record<string, typeof PgSchema>>
>;

export interface IDatabaseClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getClient(): DrizzleClient;
  isConnected(): boolean;
  executeQuery<T>(
    label: string,
    queryFn: (db: DrizzleClient) => Promise<T>
  ): Promise<T>;
}

export type DataBaseConfig = {
  url: string;
  maxConnections?: number;
  idleTimeout?: number;
  connectionTimeout?: number;
  maxUses?: number;
  ssl?: boolean;
};
