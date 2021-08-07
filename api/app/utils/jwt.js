const jwt = require("jsonwebtoken");

module.exports = {
    generateAccessToken: (user) => {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "30m",
        });
    },
    generateRefreshToken: (user) => {
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    },
    verifyAccessToken: (token, callback) => {
        return jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    return callback({ message: "Invalid token" }, null);
                }
                return callback(null, decoded);
            }
        );
    },
    verifyRefreshToken: (token, callback) => {
        return jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    return callback({ message: "Invalid token" }, null);
                }
                return callback(null, decoded);
            }
        );
    },
};
