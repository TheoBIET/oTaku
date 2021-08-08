const express = require("express");
const router = express.Router();

const { animeController } = require("../controllers");

router
    .post("/animes/search", animeController.search)
    .get("/animes/ranking", animeController.getRanking)
    .get("/animes/:animeID(\\d+)/informations", animeController.informations)
    .post("/animes/websites", animeController.websites)
    .post("/animes/streaming", animeController.streaming);

module.exports = router;
