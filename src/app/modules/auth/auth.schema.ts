import { userTable } from "../user/user.schema";
import { pgTable, uuid, text, timestamp, index } from "drizzle-orm/pg-core";

export const refreshTokenSessionTable = pgTable(
  "refresh_token_sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => userTable.id),
    tokenHash: text("token_hash").notNull(),
    userAgent: text("user_agent").notNull(),
    location: text("location").notNull(),
    ipAddress: text("ip_address").unique().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    lastUsedAt: timestamp("last_used_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  },
  (table) => {
    return {
      userIdIdx: index("sessions_user_id_idx").on(table.userId),
      expiresAtIdx: index("sessions_expires_at_idx").on(table.expiresAt),
    };
  },
);
