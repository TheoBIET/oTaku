-- Revert otaku:start_data_fix from pg

BEGIN;

-- Update anime start_date value to 1 january 2000 where start_date is null
UPDATE "anime" SET "start_date" = '2000-01-01' WHERE start_date IS NULL;

-- add not null constraint on "anime"."start_date"
ALTER TABLE "anime" ALTER "start_date" SET NOT NULL;

COMMIT;
