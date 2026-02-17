// enums.ts
import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["super_admin", "admin"]);

export const siteStatusEnum = pgEnum("site_status", [
  "running",
  "stopped",
  "completed",
]);

export const employeeStatusEnum = pgEnum("employee_status", [
  "active",
  "inactive",
]);

export const employeeTypeEnum = pgEnum("employee_type", [
  "permanent",
  "temporary",
  "contract",
]);

export const salaryTypeEnum = pgEnum("salary_type", ["hourly", "daily"]);

export const attendanceStatusEnum = pgEnum("attendance_status", [
  "present",
  "absent",
  "late",
  "half_day",
  "leave",
]);

export const salaryStatusEnum = pgEnum("salary_status", ["pending", "paid"]);
