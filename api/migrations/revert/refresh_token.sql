-- Revert Otaku:refresh_token from pg

BEGIN;

DROP TABLE "jwt_refresh_token";

COMMIT;
