-- Deploy otaku:initialization to pg

BEGIN;

CREATE TABLE "language" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE
);

CREATE TABLE "rating" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "value" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL
);

CREATE TABLE "source" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE
);

CREATE TABLE "nsfw_color" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "color" TEXT NOT NULL UNIQUE
);

CREATE TABLE "media_type" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE
);

CREATE TABLE "category" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "mal_id" INT NOT NULL UNIQUE,
    "label" TEXT NOT NULL UNIQUE
);

CREATE TABLE "studio" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "mal_id" INT NOT NULL UNIQUE,
    "label" TEXT NOT NULL UNIQUE
);

CREATE TABLE "streaming_website" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "base_url" TEXT NOT NULL UNIQUE,
    "language_id" INT NOT NULL REFERENCES "language"("id")
);

CREATE TABLE "anime" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "mal_id" INT NOT NULL UNIQUE,
    "en_title" TEXT NOT NULL,
    "jp_title" TEXT NOT NULL,
    "medium_picture_url" TEXT NOT NULL,
    "large_picture_url" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "num_episodes" INT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "mean" INT NOT NULL,
    "rank" INT NOT NULL,
    "broadcast_day" INT NOT NULL,
    "broadcast_time" INT NOT NULL,
    "rating_id" INT NOT NULL REFERENCES "rating"("id"),
    "source_id" INT NOT NULL REFERENCES "source"("id"),
    "nsfw_color_id" INT NOT NULL REFERENCES "nsfw_color"("id"),
    "media_type_id" INT NOT NULL REFERENCES "media_type"("id")
);

CREATE TABLE "streaming_link" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "website_id" INT NOT NULL REFERENCES "streaming_website"("id"),
    "anime_id" INT NOT NULL REFERENCES "anime"("id"),
    "streaming_path" TEXT NOT NULL UNIQUE
);

CREATE TABLE "anime_has_related" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "anime_id" INT NOT NULL REFERENCES "anime"("id"),
    "related_anime_id" INT NOT NULL REFERENCES "anime"("id")
);

CREATE TABLE "anime_look_like" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "anime_id" INT NOT NULL REFERENCES "anime"("id"),
    "similar_anime_id" INT NOT NULL REFERENCES "anime"("id")
);

CREATE TABLE "anime_has_category" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "anime_id" INT NOT NULL REFERENCES "anime"("id"),
    "category_id" INT NOT NULL REFERENCES "category"("id")
);

CREATE TABLE "anime_has_studio" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "anime_id" INT NOT NULL REFERENCES "anime"("id"),
    "studio_id" INT NOT NULL REFERENCES "studio"("id")
);

COMMIT;
