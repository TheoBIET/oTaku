-- Verify Otaku:refresh_token on pg

BEGIN;

SELECT * FROM "jwt_refresh_token" WHERE false;

ROLLBACK;
