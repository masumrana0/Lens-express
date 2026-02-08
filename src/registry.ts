import "reflect-metadata";
import { container } from "tsyringe";
import { DatabaseClient } from "./lib/db/client";
import { DatabaseClientToken } from "./interface/app.interface/databaseclient.interface";
import Logger from "./lib/logger/logger";

/**
 * Comeback here whenever you need to resolve a dependency before application initialization
 */

export async function registerDependencies() {
  try {
    const databaseClient = new DatabaseClient({
      url: process.env.DATABASE_URL!,
      maxConnections: 10,
      idleTimeout: 10000,
      connectionTimeout: 10000,
      maxUses: 1000,
      ssl: process.env.NODE_ENV === "production",
    });

    container.register(DatabaseClientToken, {
      useValue: databaseClient,
    });

    await databaseClient.connect();
    Logger.info("Database connected successfully", `${__filename}`);
  } catch (error) {
    console.error("Failed to register dependencies", error);
    throw error;
  }
}
