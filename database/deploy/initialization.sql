-- Deploy otaku:initialization to pg

BEGIN;

CREATE TABLE "language" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "rating" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "source" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "nsfw_color" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "media_type" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "category" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "mal_id" INT NOT NULL UNIQUE,
    "label" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "studio" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "mal_id" INT NOT NULL UNIQUE,
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
    "mean" FLOAT NOT NULL DEFAULT 0,
    "rank" INT NOT NULL DEFAULT 0,
    "broadcast_day" TEXT,
    "broadcast_time" TEXT,
    "rating_id" INT NOT NULL REFERENCES "rating"("id") DEFAULT 1,
    "source_id" INT NOT NULL REFERENCES "source"("id") DEFAULT 1,
    "nsfw_color_id" INT NOT NULL REFERENCES "nsfw_color"("id") DEFAULT 1,
    "media_type_id" INT NOT NULL REFERENCES "media_type"("id") DEFAULT 1,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "anime_episode" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "episode_num" INT NOT NULL,
    "anime_id" INT NOT NULL REFERENCES "anime"("id"),
    "streaming_link" TEXT NOT NULL UNIQUE,
    "playlist_no" INTEGER NOT NULL DEFAULT 1,
    "probable_season" INTEGER NOT NULL DEFAULT 1,
    "website_id" INT NOT NULL REFERENCES "streaming_website"("id"),
    "language_id" INT NOT NULL REFERENCES "language"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "anime_has_related_anime" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "anime_id" INT NOT NULL REFERENCES "anime"("id"),
    "related_anime_id" INT NOT NULL REFERENCES "anime"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "anime_has_suggested_anime" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "anime_id" INT NOT NULL REFERENCES "anime"("id"),
    "suggested_anime_id" INT NOT NULL REFERENCES "anime"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "anime_has_category" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "anime_id" INT NOT NULL REFERENCES "anime"("id"),
    "category_id" INT NOT NULL REFERENCES "category"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "anime_has_studio" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "anime_id" INT NOT NULL REFERENCES "anime"("id"),
    "studio_id" INT NOT NULL REFERENCES "studio"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;
