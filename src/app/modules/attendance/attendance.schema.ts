import {
  attendanceStatusEnum,
  salaryStatusEnum,
} from "@src/interface/enum/enum";
import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { employeeTable } from "../employee/employee.schema";
import { sitesTable } from "../site/site.schema";

export const attendanceTable = pgTable("attendance_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id")
    .references(() => employeeTable.id)
    .notNull(),
  siteId: uuid("site_id")
    .references(() => sitesTable.id)
    .notNull(),

  date: timestamp("date", { withTimezone: true }).notNull(),
  checkIn: varchar("check_in", { length: 50 }),
  checkOut: varchar("check_out", { length: 50 }),

  status: attendanceStatusEnum("status").notNull(),

  hoursWorked: doublePrecision("hours_worked").default(0),
  overtimeHours: doublePrecision("overtime_hours").default(0),

  period: varchar("period", { length: 50 }).notNull(),
  notes: varchar("notes", { length: 500 }),

  paymentStatus: salaryStatusEnum("payment_status").default("pending"),
  isArchive: boolean("is_archive").default(false),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
