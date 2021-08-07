const { Token } = require("../models");
const { jwtUtils } = require("../utils");

module.exports = {
    refreshToken: (req, res) => {
        const refreshToken = req.body.token;

        if (!refreshToken) {
            res.status(401).json({ message: "You must provide a token" });
        }

        const token = Token.findOne({
            where: {
                token: refreshToken,
            },
        });

        if (!token) {
            res.status(401).json({ message: "Invalid token" });
        }

        jwtUtils.verifyRefreshToken(refreshToken, (err, user) => {
            if (err) res.status(403).json({ message: "Invalid token" });
            const accessToken = jwtUtils.generateAccessToken({
                name: user.name,
            });
            res.json({
                accessToken,
            });
        });
    },
};
