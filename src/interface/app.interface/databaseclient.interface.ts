import { drizzle } from "drizzle-orm/node-postgres";
import { PgSchema, PgTable } from "drizzle-orm/pg-core";
import { SQLWrapper } from "drizzle-orm/sql/sql";

export type DrizzleClient = ReturnType<
  typeof drizzle<Record<string, typeof PgSchema>>
>;

export type ITable = PgTable & { id: SQLWrapper };
export interface IDatabaseClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getClient(): DrizzleClient;
  isConnected(): boolean;
  executeQuery<T>(
    label: string,
    queryFn: (db: DrizzleClient) => Promise<T>,
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
