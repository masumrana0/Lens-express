import { Pool } from "pg";
import {
  DataBaseConfig,
  DrizzleClient,
  IDatabaseClient,
} from "@src/interface/databaseclient.interface";
import { drizzle } from "drizzle-orm/node-postgres";
import { schema } from "./schemas";
import { ApiErrors } from "../errors/apiError";

export class DatabaseClient implements IDatabaseClient {
  private readonly pool: Pool;
  private readonly client: DrizzleClient;
  private connected: boolean = false;

  constructor(config: DataBaseConfig) {
    this.pool = new Pool({
      connectionString: config.url,
      max: config.maxConnections,
      idleTimeoutMillis: config.idleTimeout,
      connectionTimeoutMillis: config.connectionTimeout,
      maxUses: config.maxUses,
      ssl: config.ssl ?? false,
    });

    this.client = drizzle({ client: this.pool, schema });
  }

  async connect(): Promise<void> {
    if (!this.connected) {
      await this.pool.connect();
      this.connected = true;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connected) {
      await this.pool.end();
      this.connected = false;
    }
  }

  getClient(): DrizzleClient {
    return this.client;
  }

  isConnected(): boolean {
    return this.connected;
  }

  async executeQuery<T>(
    label: string,
    queryFn: (db: DrizzleClient) => Promise<T>
  ): Promise<T> {
    const start = performance.now();

    try {
      const result = await queryFn(this.client);
      const duration = performance.now() - start;

      console.log(`[${label}] completed in ${duration.toFixed(2)}ms`);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      console.error(`[${label}] failed in ${duration.toFixed(2)}ms`);
      console.log(error);

      throw ApiErrors.InternalServerError(`[${label}] Database query failed`);
    }
  }
}
