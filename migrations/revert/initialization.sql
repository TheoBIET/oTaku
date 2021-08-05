-- Revert Otaku:initialization from pg

BEGIN;

DROP TABLE "user", "role";

COMMIT;
