module.exports = {

    aboutAPI: (_, res) => {
        res.json({
            version: "0.0.1",
            author: "Théo BIET",
            discord: "ƊɑѵƊɑѵ#5517",
            github: "https://github.com/TheoBIET/otaku-API"
        })
    },


    index: (req, res) => {
        res.render('index');
    }

}