-- Revert otaku:anime_episode from pg

BEGIN;

CREATE TABLE "language" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "streaming_website" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "base_url" TEXT NOT NULL UNIQUE,
    "language_id" INT NOT NULL REFERENCES "language"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

INSERT INTO "language" (label) VALUES ('default');
INSERT INTO "streaming_website" (base_url, language_id) VALUES ('https://example.com', 1);

-- Drop column website & language from anime_episode
ALTER TABLE anime_episode
    DROP COLUMN website,
    DROP COLUMN language;

-- Add column website & language to anime_episode
ALTER TABLE anime_episode
    ADD COLUMN "website_id" INT NOT NULL REFERENCES "streaming_website"("id") DEFAULT 1,
    ADD COLUMN "language_id" INT NOT NULL REFERENCES "language"("id") DEFAULT 1;

COMMIT;
