-- Verify Otaku:initialization on pg

BEGIN;

SELECT * FROM "user" WHERE false;
SELECT * FROM "role" WHERE false;

ROLLBACK;
