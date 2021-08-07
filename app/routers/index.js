const express = require("express");
const router = express.Router();
const {
    userController,
    animeController,
    tokenController,
} = require("../controllers");
const { tokenMiddelware } = require("../middlewares");

router.get("/", (req, res) => {
    res.send("Hello On Otaku API!");
});

router
    .post("/token", tokenController.checkIfExists)

    .post(
        "/animes/search",
        tokenMiddelware.authenticateToken,
        animeController.search
    )
    .get(
        "/animes/ranking",
        tokenMiddelware.authenticateToken,
        animeController.getRanking
    )
    .get(
        "/animes/:animeID(\\d+)/informations",
        tokenMiddelware.authenticateToken,
        animeController.informations
    )
    .post(
        "/animes/websites",
        tokenMiddelware.authenticateToken,
        animeController.websites
    )
    .post(
        "/animes/streaming",
        tokenMiddelware.authenticateToken,
        animeController.streaming
    )

    .get("/user/:username", userController.getProfile)
    .post("/user/login", userController.login)
    .post("/user/signup", userController.createAccount)
    .delete("/user/delete", userController.deleteAccount)
    .put("/user/update/password", userController.updatePassword)
    .put("/user/update", userController.updateInformations);

module.exports = router;
