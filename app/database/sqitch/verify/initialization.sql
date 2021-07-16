-- Verify otaku:initialization on pg

BEGIN;

SELECT "id" FROM "language" WHERE false;
SELECT "id" FROM "rating" WHERE false;
SELECT "id" FROM "source" WHERE false;
SELECT "id" FROM "nsfw_color" WHERE false;
SELECT "id" FROM "media_type" WHERE false;
SELECT "id" FROM "category" WHERE false;
SELECT "id" FROM "studio" WHERE false;
SELECT "id" FROM "streaming_website" WHERE false;
SELECT "id" FROM "anime" WHERE false;
SELECT "id" FROM "streaming_links" WHERE false;
SELECT "id" FROM "anime_has_related" WHERE false;
SELECT "id" FROM "anime_look_like" WHERE false;
SELECT "id" FROM "anime_has_category" WHERE false;
SELECT "id" FROM "anime_has_studio" WHERE false;

ROLLBACK;
