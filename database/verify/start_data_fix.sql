-- Verify otaku:start_data_fix on pg

BEGIN;

SELECT start_date FROM anime WHERE start_date = null;

ROLLBACK;
