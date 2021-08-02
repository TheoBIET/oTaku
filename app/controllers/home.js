module.exports = {
    API_Informations: (_, res) => {
        res.send({
            name: "otaku-API",
            version: "0.5",
            author: "@TheoBIET",
            github: "https://github.com/TheoBIET/otaku-API",
            support: "https://github.com/TheoBIET/otaku-API/issues",
        });
    },
};
