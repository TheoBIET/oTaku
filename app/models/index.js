const Anime = require("./anime");
const Category = require("./category");
const Episode = require("./episode");
const Media = require("./media");
const NSFW = require("./nsfw");
const Rating = require("./rating");
const Source = require("./source");
const Studio = require("./studio");

Anime.belongsToMany(Category, {
    as: "categories",
    through: "anime_has_category",
    foreignKey: "anime_id",
    otherKey: "category_id",
});

Category.belongsToMany(Anime, {
    as: "animes",
    through: "anime_has_category",
    foreignKey: "category_id",
    otherKey: "anime_id",
});

Anime.belongsToMany(Anime, {
    as: "related_animes",
    through: "anime_has_related_anime",
    foreignKey: "anime_id",
    otherKey: "related_anime_id",
});

Anime.belongsToMany(Anime, {
    as: "master_related_anime",
    through: "anime_has_related_anime",
    foreignKey: "related_anime_id",
    otherKey: "anime_id",
});

Anime.belongsToMany(Anime, {
    as: "suggested_animes",
    through: "anime_has_suggested_anime",
    foreignKey: "anime_id",
    otherKey: "suggested_anime_id",
});

Anime.belongsToMany(Anime, {
    as: "master_suggest_anime",
    through: "anime_has_suggested_anime",
    foreignKey: "suggested_anime_id",
    otherKey: "anime_id",
});

Anime.belongsToMany(Studio, {
    as: "studios",
    through: "anime_has_studio",
    foreignKey: "anime_id",
    otherKey: "studio_id",
});

Studio.belongsToMany(Anime, {
    as: "anime",
    through: "anime_has_studio",
    foreignKey: "studio_id",
    otherKey: "anime_id",
});

Anime.belongsTo(Media, {
    as: "media_type",
    foreignKey: {
        name: "media_type_id",
        allowNull: false,
        defaultValue: 1,
    },
});

Media.hasMany(Anime, {
    as: "animes",
    foreignKey: "media_type_id",
});

Anime.belongsTo(NSFW, {
    as: "nsfw_color",
    foreignKey: {
        name: "nsfw_color_id",
        allowNull: false,
        defaultValue: 1,
    },
});

NSFW.hasMany(Anime, {
    as: "animes",
    foreignKey: "nsfw_color_id",
});

Anime.belongsTo(Rating, {
    as: "rating",
    foreignKey: {
        name: "rating_id",
        allowNull: false,
        defaultValue: 1,
    },
});

Rating.hasMany(Anime, {
    as: "animes",
    foreignKey: "rating_id",
});

Anime.belongsTo(Source, {
    as: "source",
    foreignKey: {
        name: "source_id",
        allowNull: false,
        defaultValue: 1,
    },
});

Source.hasMany(Anime, {
    as: "animes",
    foreignKey: "source_id",
});

Episode.belongsTo(Anime, {
    as: "anime",
    foreignKey: {
        name: "anime_id",
        allowNull: false,
    },
});

Anime.hasMany(Episode, {
    as: "episodes",
    foreignKey: "anime_id",
});

module.exports = {
    Anime,
    Category,
    Episode,
    Media,
    NSFW,
    Rating,
    Source,
    Studio,
};
