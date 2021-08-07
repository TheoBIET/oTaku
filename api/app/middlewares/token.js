const { jwtUtils } = require("../utils");

module.exports = {
    authenticateToken: (req, res, next) => {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];

        if (token === "undefined") {
            return res.status(401).send({
                message: "No token provided.",
            });
        }

        jwtUtils.verifyAccessToken(token, (err, user) => {
            if (err) {
                return res.status(401).send({
                    message: "Failed to authenticate token.",
                });
            }
            req.user = user;
            next();
        });
    },
};
