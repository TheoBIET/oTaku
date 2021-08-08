const express = require("express");
const router = express.Router();

const { animeController } = require("../controllers");
const { tokenMiddleware } = require("../middlewares");

router
    .post(
        "/animes/search",
        tokenMiddleware.authenticateToken,
        animeController.search
    )
    .get("/animes/ranking", animeController.getRanking)
    .get(
        "/animes/:animeID(\\d+)/informations",
        tokenMiddleware.authenticateToken,
        animeController.informations
    )
    .post(
        "/animes/websites",
        tokenMiddleware.authenticateToken,
        animeController.websites
    )
    .post(
        "/animes/streaming",
        tokenMiddleware.authenticateToken,
        animeController.streaming
    );

module.exports = router;
