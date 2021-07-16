const CoreModel = require("./coreModel");

class Anime extends CoreModel {
    
    static tableName = 'anime'

    constructor(data) {
        super(data);
        this.mal_id = data.mal_id,
        this.en_title = data.en_title,
        this.jp_title = data.jp_title,
        this.medium_picture_url = data.medium_picture_url,
        this.large_picture_url = data.large_picture_url,
        this.start_date = data.start_date,
        this.end_date = data.start_date,
        this.num_episodes = data.num_episodes,
        this.synopsis = data.synopsis,
        this.mean = data.mean,
        this.rank = data.rank,
        this.broadcast_day = data.broadcast_day,
        this.broadcast_time = data.broadcast_time,
        this.rating_id = data.rating_id,
        this.source_id = data.rating_id,
        this.nsfw_color_id = data.nsfw_color_id,
        this.media_type_id = data.media_type_id
    }

}

module.exports = Anime;