-- Deploy otaku:anime_episode to pg

BEGIN;

-- Drop column website & language from anime_episode
ALTER TABLE anime_episode
    DROP COLUMN website_id,
    DROP COLUMN language_id;

DROP TABLE streaming_website;
DROP TABLE language ;

-- Add column website & language to anime_episode
ALTER TABLE anime_episode
    ADD COLUMN website TEXT NOT NULL DEFAULT 'Web',
    ADD COLUMN language TEXT NOT NULL DEFAULT 'VF';


COMMIT;
