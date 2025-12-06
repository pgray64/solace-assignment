CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE TABLE IF NOT EXISTS "advocates" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"city" text NOT NULL,
	"degree" text NOT NULL,
	"payload" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"years_of_experience" integer NOT NULL,
	"phone_number" bigint NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_firstname_trgm" ON "advocates" USING gin ("first_name" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_lastname_trgm" ON "advocates" USING gin ("last_name" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_city_trgm" ON "advocates" USING gin ("city" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_degree_trgm" ON "advocates" USING gin ("degree" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_specialties_search_trgm" ON "advocates" USING gin (("payload"::text) gin_trgm_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_years_exp" ON "advocates" USING btree ("years_of_experience");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_phone" ON "advocates" USING btree ("phone_number");