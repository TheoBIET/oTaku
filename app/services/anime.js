const client = require('../client');
const {MAL} = require('../constants');
const {Anime} = require('../models');
const log = require('log-beautify');

module.exports = {
    // Function to check if the anime provided by MAL is already present, or not, in the database
    async checkIfAlreadyExists(id) {
        const anime = await client.query('SELECT mal_id FROM anime WHERE mal_id = $1', [id]);
        // If, the anime is not found x will be equal to 0, and 0 returns falsy
        return anime.rows.length;
    },

    async formatAnime(anime) {
        const formattedAnime = {
            mal_id: anime.id,
            en_title: anime.title,
            jp_title: anime.alternative_titles.ja,
            medium_picture_url: anime.main_picture.medium,
            large_picture_url: anime.main_picture.large,
            start_date: anime.start_date,
            end_date: anime.start_date,
            num_episodes: anime.num_episodes,
            synopsis: anime.synopsis,
            mean: anime.mean,
            rank: anime.rank,
            rating_id: await this.getID(MAL.rating.tableName, anime.rating),
            source_id: await this.getID(MAL.source.tableName, anime.source),
            nsfw_color_id: await this.getID(MAL.source.tableName, anime.nsfw),
            media_type_id: await this.getID(MAL.media.tableName, anime.media_type),
        }

        if(anime.broadcast) {
            formattedAnime.broadcast_day = anime.broadcast.day_of_the_week;
            formattedAnime.broadcast_time = anime.broadcast.start_time;
        }

        return formattedAnime;
    },

    async getID(tableName, label) {
        const results = await client.query(`SELECT id FROM "${tableName}" WHERE label=$1`, [label]);
        // If, there isn't results, we return 1, a default value
        if(results.rows.length) {
            return results.rows[0].id;
        } else {
            return 1
        }
    },

    async insertAnime(anime) {
        const formattedAnime = await this.formatAnime(anime);
        const newAnime = new Anime(formattedAnime);
        await newAnime.insert();
        log.success(`(${newAnime.mal_id}) Inserted`);
    }
}