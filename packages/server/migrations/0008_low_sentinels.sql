CREATE TABLE IF NOT EXISTS "statistics" (
	"user_id" uuid NOT NULL,
	"date" date NOT NULL,
	"engagements" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "statistics" ADD CONSTRAINT "statistics_user_id_date" PRIMARY KEY("user_id","date");

ALTER TABLE "preferences" ALTER COLUMN "created_at" SET DEFAULT now();
ALTER TABLE "preferences" ALTER COLUMN "created_at" SET NOT NULL;