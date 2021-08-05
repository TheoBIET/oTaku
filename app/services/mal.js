module.exports = {
    format(anime) {
        return {
            mal_id: anime.id,
            en_title: anime.title,
            jp_title: anime.alternative_titles?.ja ?? "Unknown",
            medium_picture_url: anime.main_picture.medium,
            large_picture_url: anime.main_picture.large,
            start_date: anime.start_date,
            end_date: anime.start_date,
            num_episodes: anime.num_episodes,
            synopsis: anime.synopsis,
            genres: anime.genres.map((genre) => genre.name),
            studios: anime.studios.map((studio) => studio.name),
            mean: anime.mean,
            rank: anime.rank,
            rating: anime.rating,
            source: anime.source,
            nsfw_color: anime.nsfw,
            media_type: anime.media_type,
            broadcast_day: anime.broadcast?.day_of_the_week ?? "Unknown",
            broadcast_time: anime.broadcast?.start_time ?? "Unknown",
        };
    },
};
