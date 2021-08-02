/*
 Some of the information returned by the API is constant, and will be necessary for us. 
 It is stored statically within the application to avoid unnecessary requests, directly insert them into the database after the database
 has been deployed
*/
module.exports = {
    apiURL: "https://api.myanimelist.net/v2",
    apiParams:
        "fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics",
    seeding: {
        nsfw: {
            tableName: "nsfw_color",
            data: ["white", "gray", "black"],
        },
        media: {
            tableName: "media_type",
            data: ["unknown", "tv", "ova", "movie", "special", "ona", "music"],
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
            ],
        },
        rating: {
            tableName: "rating",
            data: ["g", "pg", "pg_13", "r", "r+", "rx"],
        },
    },
};
