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
    streaming_link,
    anime_has_related,
    anime_look_like,
    anime_has_category,
    anime_has_studio;

COMMIT;
