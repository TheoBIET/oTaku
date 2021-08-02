const express = require("express");
const router = express.Router();

const { searchController, animeController } = require("../controllers");

router
    .get("/animes/trends/mostviewed", animeController.mostViewed)
    .get("/animes/trends/toprated", animeController.topRated)
    .get("/animes/trends/ourselection", animeController.ourSelection)
    .post("/animes/search", searchController.search)
    .get("/animes/streaming/:id", searchController.getLinks);

module.exports = router;