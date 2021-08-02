const express = require("express");
const router = express.Router();

const { homeController, errorController } = require("../controllers");
const animeRouter = require("./anime");

router
    .get("/", homeController.API_Informations)
    .use(animeRouter)
    .use(errorController.resourceNotFound);

module.exports = router;
