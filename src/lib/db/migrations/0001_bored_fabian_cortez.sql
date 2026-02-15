CREATE TABLE "refresh_token_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"user_agent" text NOT NULL,
	"location" text NOT NULL,
	"ip_address" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_used_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "refresh_token_sessions_ip_address_unique" UNIQUE("ip_address")
);
--> statement-breakpoint
ALTER TABLE "refresh_token_sessions" ADD CONSTRAINT "refresh_token_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "refresh_token_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sessions_expires_at_idx" ON "refresh_token_sessions" USING btree ("expires_at");