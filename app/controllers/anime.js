const itachi = require("../lib");

module.exports = {
    search: async (req, res) => {
        // TODO : Search with My Anime List API
    },

    informations: async (req, res) => {
        // TODO : Get informations from MyAnimeList
    },

    websites: async (req, res) => {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).send({
                    message: "You must provide a name.",
                });
            }

            const results = await itachi.getAnimes(name);

            res.send(results);
        } catch (error) {
            res.status(500).send({
                message: "Internal servor error. Please retry later",
            });
        }
    },

    streaming: async (req, res) => {
        try {
            const { plateform, url } = req.body;

            if (!plateform || !url) {
                return res.status(400).send({
                    message: "You must provide a plateform and a valid URL.",
                });
            }

            const results = await itachi.getStreaming(plateform, url);

            res.send(results);
        } catch (error) {
            res.status(500).send({
                message: "Internal servor error. Please retry later",
            });
        }
    },
};
