const express = require("express");
const router = express.Router();

const { userController, animeController } = require("../controllers");

router.get("/", (req, res) => {
    res.send("Hello On Otaku API!");
});

router
    .post("/animes/search", animeController.search)
    .get("/animes/:animeID(\\d+)/informations", animeController.informations)
    .post("/animes/websites", animeController.websites)
    .post("/animes/streaming", animeController.streaming)

    .get("/user/:username", userController.getProfile)
    .post("/user/login", userController.login)
    .post("/user/signup", userController.createAccount)
    .delete("/user/delete", userController.deleteAccount)
    .put("/user/update/password", userController.updatePassword)
    .put("/user/update", userController.updateInformations);

module.exports = router;
