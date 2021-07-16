/*
 Some of the information returned by the API is constant, and will be necessary for us. 
 It is stored statically within the application to avoid unnecessary requests, directly insert them into the database after the database
 has been deployed
*/
module.exports = {
    nsfw: {
        tableName: "nsfw_color",
        data: ["white", "gray", "black"]
    },
    media: {
        tableName: "media_type",
        data: ["unknown", "tv", "ova", "movie", "special", "ona", "music"]
    },
    source: {
        tableName: "source",
        data: [
            "other",
            "original",
            "manga",
            "4_koma_manga",
            "web_manga",
            "digital_manga",
            "novel",
            "light_novel",
            "visual_novel",
            "game",
            "card_game",
            "book",
            "picture_book",
            "radio",
            "music",
        ]
    },
    rating: {
        tableName: "rating",
        data: ['g', 'pg', 'pg_13', 'r', 'r+', 'rx']
    }
};
