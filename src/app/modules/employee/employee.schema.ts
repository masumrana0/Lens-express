// employee.ts
import { employeeStatusEnum, employeeTypeEnum } from "@src/interface/enum/enum";
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { sitesTable } from "../site/site.schema";

export const employeeTable = pgTable("employees", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeCode: varchar("employee_code", { length: 20 }).unique().notNull(),
  employeeType: employeeTypeEnum("role").default("temporary"),
  residencyId: varchar("residency_id", { length: 50 }),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  salaryType: employeeStatusEnum("salary_type").notNull(),
  salaryRate: doublePrecision("salary_rate").notNull(),
  overtimeRate: doublePrecision("overtime_rate").default(0),
  joinDate: timestamp("join_date", { withTimezone: true }).defaultNow(),
  isActive: boolean("is_active").default(true),
  isArchive: boolean("is_archive").default(false),
  siteId: uuid("site_id").references(() => sitesTable.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
