const { Anime } = require("../models");
const { Op } = require("sequelize");

module.exports = {

    index: (_, res) => {
        res.send({
            data: 'welcome to otaku API'
        });
    },

    getInformationsForHomepage: async (req, res) => {

        // Get All Anime order by rank limit 10
        const most_watched = await Anime.findAll({
            where: {
                rank: {
                    [Op.gt]: 0
                },
                num_episodes: {
                    [Op.gt]: 1
                }
            },
            order: [
                ['rank', 'ASC']
            ],
            include: [
                'studios',
                'rating',
                'source',
                'nsfw_color',
                'media_type',
                'categories',
                'episodes'
            ],
            limit: 10
        });

        // findAll where id = 2 ou 39
        const our_selection = await Anime.findAll({
            where: {
                id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            },
            include: [
                'studios',
                'rating',
                'source',
                'nsfw_color',
                'media_type',
                'categories',
                'episodes'
            ],
        });

        const best_rated = await Anime.findAll({
            order: [
                ['mean', 'DESC']
            ],
            include: [
                'studios',
                'rating',
                'source',
                'nsfw_color',
                'media_type',
                'categories',
                'episodes'
            ], 
            limit: 10
        });

        const allAnimes = await Anime.findAll({
            order: [
                ['mean', 'DESC']
            ],
            include: [
                'studios',
                'rating',
                'source',
                'nsfw_color',
                'media_type',
                'categories',
                'episodes'
            ],
            limit: 10
        });

        res.send({
            most_watched,
            our_selection,
            best_rated,
        });
    }

}