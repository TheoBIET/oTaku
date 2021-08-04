const express = require("express");
const router = express.Router();
const itachi = require("baaka-itachi");

router.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

router.post("/animes/search", async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send({ message: "You must provide a name." });
    }

    const results = await itachi.search(name);

    res.send(results);
});

router.post("/animes/informations", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).send({ message: "You must provide a url." });
    }

    const results = await itachi.getInformations(url);

    res.send(results);
});

router.post("/animes/websites", async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send({ message: "You must provide a name." });
    }

    const results = await itachi.getAnimes(name);

    res.send(results);
});

router.post("/animes/streaming", async (req, res) => {
    const { plateform, url } = req.body;

    if (!plateform || !url) {
        return res
            .status(400)
            .send({ message: "You must provide a plateform and a valid URL." });
    }

    const results = await itachi.getStreaming(plateform, url);

    res.send(results);
});

module.exports = router;
