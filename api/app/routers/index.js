const express = require("express");
const router = express.Router();
const animeRouter = require("./anime");
const userRouter = require("./user");
const tokenRouter = require("./token");

router.get("/", (_, res) => {
    res.json({
        message: "Welcome to the API!",
        version: "0.6.3",
        status: "Alpha",
        author: "Théo BIET",
        email: "dev.theobiet@gmail.com",
        license: "MIT",
        github: "https://github.com/TheoBIET/oTaku",
        bugs: "https://github.com/TheoBIET/oTaku/issues",
        documentation: "Currently Unavailable",
    });
});

router.use(userRouter);
router.use(animeRouter);
router.use(tokenRouter);

module.exports = router;
