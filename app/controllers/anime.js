const { Anime } = require("../models");
const { Op } = require("sequelize");

module.exports = {
    async mostViewed(_, res) {
        try {
            res.send({
                message: "Most viewed animes successfully recovered",
                data: await Anime.findAll({
                    where: {
                        rank: {
                            [Op.gt]: 0,
                        },
                        num_episodes: {
                            [Op.gt]: 1,
                        },
                    },
                    order: [["rank", "ASC"]],
                    include: [
                        "studios",
                        "rating",
                        "source",
                        "nsfw_color",
                        "media_type",
                        "categories",
                        "episodes",
                    ],
                    limit: 10,
                }),
            });
        } catch (error) {
            console.error(error);
            res.status(400).send({
                message: "Internal Server Error",
            });
        }
    },

    async topRated(_, res) {
        try {
            res.send({
                message: "Top rated animes successfully recovered",
                data: await Anime.findAll({
                    order: [["mean", "DESC"]],
                    include: [
                        "studios",
                        "rating",
                        "source",
                        "nsfw_color",
                        "media_type",
                        "categories",
                        "episodes",
                    ],
                    limit: 10,
                }),
            });
        } catch (error) {
            console.error(error);
            res.status(400).send({
                message: "Internal Server Error",
            });
        }
    },

    async ourSelection(_, res) {
        try {
            res.send({
                message: "our selection animes successfully recovered",
                data: await Anime.findAll({
                    where: {
                        id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    },
                    include: [
                        "studios",
                        "rating",
                        "source",
                        "nsfw_color",
                        "media_type",
                        "categories",
                        "episodes",
                    ],
                }),
            });
        } catch (error) {
            console.error(error);
            res.status(400).send({
                message: "Internal Server Error",
            });
        }
    },
};
