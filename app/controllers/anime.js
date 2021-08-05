const itachi = require("../lib");

module.exports = {
    search: async (req, res) => {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).send({
                    message: "You must provide a name.",
                });
            }

            const results = await itachi.search(name);

            res.send(results);
        } catch (error) {
            res.status(500).send({
                message: "Internal servor error. Please retry later",
            });
        }
    },

    informations: async (req, res) => {
        try {
            const { url } = req.body;

            if (!url) {
                return res.status(400).send({
                    message: "You must provide a url.",
                });
            }

            const results = await itachi.getInformations(url);

            res.send(results);
        } catch (error) {
            res.status(500).send({
                message: "Internal servor error. Please retry later",
            });
        }
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
