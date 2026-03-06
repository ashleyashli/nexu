CREATE TABLE IF NOT EXISTS "e2e_test_migration" (
  "id" text PRIMARY KEY,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
