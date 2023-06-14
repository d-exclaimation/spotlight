CREATE TABLE IF NOT EXISTS "codes" (
	"code" char(8) PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS "user_code_idx" ON "codes" ("user_id","code");