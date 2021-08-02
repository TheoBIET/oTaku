const { Op } = require("sequelize");
const { Anime, Episode } = require("../models");

const { myAnimeList } = require("../utils");

const { vostFree } = require("../utils");

module.exports = {
    search: async (req, res, next) => {
        const animeName = req.body.name;

        if (!animeName) {
            return res.status(400).send({
                message: "You must provide a name",
                data: [],
            });
        }

        try {
            res.send({
                message: "Success",
                data: {
                    myAnimeList: await myAnimeList.search(animeName),
                    database: await Anime.findAll({
                        where: {
                            [Op.or]: [
                                { en_title: { [Op.iLike]: `%${animeName}%` } },
                                { jp_title: { [Op.iLike]: `%${animeName}%` } },
                            ],
                        },
                        limit: 10,
                    }),
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: "Error",
                data: [],
            });
        }
    },

    getLinks: async (req, res, next) => {
        const malId = req.params.id;
        const anime = await Anime.findOne({
            where: { mal_id: malId },
            include: [
                "studios",
                "rating",
                "source",
                "nsfw_color",
                "media_type",
                "categories",
                "episodes",
            ],
        });

        if (!anime) {
            return next();
        }

        if (anime.episodes.length === 0) {
            const animeLinks = await vostFree.getAnimeLinksList(anime.en_title);

            for (const link of animeLinks) {
                const episodes = await vostFree.getStreamingList(link.url);

                let i = 1;

                for (const episode of episodes) {
                    const episodeAlreadyExists = await Episode.findOne({
                        where: {
                            streaming_link: episode.link,
                            anime_id: anime.id,
                        },
                    });
                    if (!episodeAlreadyExists) {
                        await Episode.create({
                            episode_num:
                                parseInt(
                                    episode.title
                                        .split(" ")
                                        .filter((w) => !isNaN(w)),
                                    10
                                ) || 0,
                            playlist_no: i,
                            probable_season: episode.probableSeason,
                            anime_id: anime.id,
                            streaming_link: episode.link,
                            language: link.language,
                            website: link.plateform,
                        });
                    }
                }

                i++;
            }
        }

        await anime.reload();
        res.send(anime);
        
    },
};
