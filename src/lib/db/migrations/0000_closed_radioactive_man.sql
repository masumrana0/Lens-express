CREATE TYPE "public"."attendance_status" AS ENUM('present', 'absent', 'late', 'half_day', 'leave');--> statement-breakpoint
CREATE TYPE "public"."employee_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."employee_type" AS ENUM('permanent', 'temporary', 'contract');--> statement-breakpoint
CREATE TYPE "public"."salary_status" AS ENUM('pending', 'paid');--> statement-breakpoint
CREATE TYPE "public"."salary_type" AS ENUM('hourly', 'daily');--> statement-breakpoint
CREATE TYPE "public"."site_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('super_admin', 'admin');--> statement-breakpoint
CREATE TABLE "attendance_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid NOT NULL,
	"site_id" uuid NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"check_in" varchar(50),
	"check_out" varchar(50),
	"status" "attendance_status" NOT NULL,
	"hours_worked" double precision DEFAULT 0,
	"overtime_hours" double precision DEFAULT 0,
	"period" varchar(50) NOT NULL,
	"notes" varchar(500),
	"payment_status" "salary_status" DEFAULT 'pending',
	"is_archive" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_code" varchar(20) NOT NULL,
	"role" "employee_type" DEFAULT 'temporary',
	"residency_id" varchar(50),
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(50) NOT NULL,
	"position" varchar(255) NOT NULL,
	"salary_type" "employee_status" NOT NULL,
	"salary_rate" double precision NOT NULL,
	"overtime_rate" double precision DEFAULT 0,
	"join_date" timestamp with time zone DEFAULT now(),
	"is_active" boolean DEFAULT true,
	"is_archive" boolean DEFAULT false,
	"site_id" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "employees_employee_code_unique" UNIQUE("employee_code")
);
--> statement-breakpoint
CREATE TABLE "sites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"description" varchar(500),
	"employee_count" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"is_archive" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"designation" varchar(255),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;