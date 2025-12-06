DROP INDEX IF EXISTS "idx_advocates_phone";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_phone_trgm" ON "advocates" USING gin ("phone_number" gin_trgm_ops);