CREATE TABLE IF NOT EXISTS "preferences" (
	"user_id" uuid NOT NULL,
	"category" text NOT NULL,
	"engagements" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "preferences" ADD CONSTRAINT "preferences_user_id_category" PRIMARY KEY("user_id","category");

ALTER TABLE "users" ADD COLUMN "glances" integer DEFAULT 0 NOT NULL;