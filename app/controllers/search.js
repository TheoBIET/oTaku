const { Anime, Episode } = require('../models');

const { myAnimeList } = require('../utils');

const {
    vostFree
} = require('../utils');


module.exports = {

    search: async (req, res, next) => {
        const animeName = req.body.name;

        if (!animeName) {
            return next();
        }

        myAnimeList.search(animeName, (err, results) => {
            if (err) {
                return next();
            }

            res.send({
                status: 'success',
                message: 'POST on /api/search/streaming/:mal_id for get a streaming Link',
                warning: "If you don't get many results, please check the spelling and try again, when a manga has never been searched it can take a few seconds to receive its information in the database, a new query can make you happy!",
                rows: results.length,
                data: results
            });

        })
    },

    getLinks: async (req, res, next) => {
        const malId = req.params.id;
        const anime = await Anime.findOne({
            where: { mal_id: malId },
            include: [
                'studios',
                'rating',
                'source',
                'nsfw_color',
                'media_type',
                'categories',
                'episodes'
            ]
        }
        );

        if (!anime) {
            return next();
        }

        if (anime.episodes.length === 0) {
            const animeLinks = await vostFree.getAnimeLinksList(anime.en_title);

            for (const link of animeLinks) {
                const episodes = await vostFree.getStreamingList(link.url);

                let i = 1;

                for (const episode of episodes) {
                    const episodeAlreadyExists = await Episode.findOne({ where: { streaming_link: episode.link, anime_id: anime.id } });
                    if (!episodeAlreadyExists) {
                        await Episode.create({
                            episode_num: parseInt(episode.title.split(' ').filter(w => !isNaN(w)), 10) || 0,
                            playlist_no: i,
                            probable_season: episode.probableSeason,
                            anime_id: anime.id,
                            streaming_link: episode.link,
                            language: link.language,
                            website: link.plateform
                        });
                    }
                }

                i++
            }
        }
        await anime.reload();
        res.send(anime);
    }
}