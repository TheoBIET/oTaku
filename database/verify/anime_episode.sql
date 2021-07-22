-- Verify otaku:anime_episode on pg

BEGIN;

SELECT * FROM anime_episode WHERE language = 'VF';

ROLLBACK;
