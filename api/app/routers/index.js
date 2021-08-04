const express = require("express");
const router = express.Router();
const itachi = require("baaka-itachi");
const anime = require('../controllers/anime');
const user = require('../controllers/user')

router.get("/", (req, res) => {
    res.send("Hello On Otaku Anime!" );
});

router.post("/animes/search",anime.search);
router.post("/animes/informations",anime.informations);
router.post("/animes/websites",anime.websites);
router.post("/animes/streaming",anime.streaming);

router.post("/user/signup",user.create);
router.post("/user/delete",user.deleteUser);
router.post("/user/update",user.update);

module.exports = router;
