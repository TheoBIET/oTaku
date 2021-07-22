-- Revert otaku:initialization from pg

BEGIN;

DROP TABLE 
    language, 
    rating, 
    source, 
    nsfw_color, 
    media_type,
    category,
    studio,
    streaming_website,
    anime,
    anime_episode,
    anime_has_related_anime,
    anime_has_suggested_anime,
    anime_has_category,
    anime_has_studio;

COMMIT;
