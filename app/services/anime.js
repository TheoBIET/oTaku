const { Anime } = require('../models');

module.exports = {

    searchAnime(query) {
        const anime = Anime.findAll({
            where: {
                $or: [
                    { en_title: { $like: `%${query.toLowerCase()}%` } },
                    { jp_title: { $like: `%${query.toLowerCase()}%` } }
                ]
            }
        });

        return anime;
    }

}