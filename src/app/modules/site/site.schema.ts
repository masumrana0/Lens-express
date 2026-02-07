// site.ts
import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const sitesTable = pgTable("sites", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  description: varchar("description", { length: 500 }),
  employeeCount: integer("employee_count").default(0),
  isActive: boolean("is_active").default(true),
  isArchive: boolean("is_archive").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
