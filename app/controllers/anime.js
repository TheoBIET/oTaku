const itachi = require("../lib/itachi");
const mal = require("../lib/mal-ext");
const { malServices } = require("../services");

const MAL_BEARER = process.env.MAL_BEARER;

// TODO : JSDoc
module.exports = {
    async search(req, res) {
        try {
            const results = await mal.search("One Piece", MAL_BEARER);
            return res.json(
                results.map((anime) => malServices.format(anime.node))
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal servor error. Please retry later",
            });
        }
    },

    async informations(req, res) {
        try {
            const { animeID } = req.params;
            const results = await mal.getDetails(animeID, MAL_BEARER);
            return res.json(malServices.format(results));
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal servor error. Please retry later",
            });
        }
    },

    async websites(req, res) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({
                    message: "You must provide a name.",
                });
            }

            const results = await itachi.getAnimes(name);

            res.json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal servor error. Please retry later",
            });
        }
    },

    async streaming(req, res) {
        try {
            const { plateform, url } = req.body;

            if (!plateform || !url) {
                return res.status(400).json({
                    message: "You must provide a plateform and a valid URL.",
                });
            }

            const results = await itachi.getStreaming(plateform, url);

            res.json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal servor error. Please retry later",
            });
        }
    },
};
