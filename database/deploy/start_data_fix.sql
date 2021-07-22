-- Deploy otaku:start_data_fix to pg

BEGIN;

-- Remove not null constraint on "anime"."start_date"
ALTER TABLE "anime" ALTER COLUMN "start_date" DROP NOT NULL;

COMMIT;
