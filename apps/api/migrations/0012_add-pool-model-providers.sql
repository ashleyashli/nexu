CREATE TABLE "pool_model_providers" (
	"pk" serial PRIMARY KEY NOT NULL,
	"id" text NOT NULL,
	"pool_id" text NOT NULL,
	"provider_key" text NOT NULL,
	"base_url" text NOT NULL,
	"api_type" text NOT NULL,
	"encrypted_api_key" text,
	"models_json" text DEFAULT '[]' NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL,
	CONSTRAINT "pool_model_providers_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "pool_model_providers_pool_provider_idx" ON "pool_model_providers" USING btree ("pool_id","provider_key");--> statement-breakpoint
CREATE INDEX "pool_model_providers_pool_status_idx" ON "pool_model_providers" USING btree ("pool_id","status");