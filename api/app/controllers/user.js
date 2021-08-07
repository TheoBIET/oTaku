const {
    User,
    Token
} = require("../models");
const bcrypt = require("bcrypt");
const {
    Op
} = require("sequelize");

const {
    jwtUtils
} = require("../utils");

// TODO : JSDoc
module.exports = {
    async getProfile(req, res) {
        try {
            const {
                username
            } = req.params;

            const user = await User.findOne({
                where: {
                    username: {
                        [Op.iLike]: username,
                    },
                },
            });

            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            return res.json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: "Internal servor error. Please retry later",
            });
        }
    },
    async login(req, res) {
        try {
            const {
                login,
                password
            } = req.body;

            if (!login || !password) {
                return res.status(400).json({
                    message: "Login and password are required",
                });
            }

            const user = await User.findOne({
                where: {
                    [Op.or]: {
                        username: {
                            [Op.iLike]: login,
                        },
                        email: {
                            [Op.iLike]: login,
                        },
                    },
                },
            });

            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({
                    message: "Incorrect password",
                    login,
                });
            }

            const userData = user.toJSON();
            const accessToken = jwtUtils.generateAccessToken(userData);
            const refreshToken = jwtUtils.generateRefreshToken(userData);

            const tokenToSave = new Token({
                user_id: user.id,
                token: refreshToken,
            });

            await tokenToSave.save();

            return res.json({
                ...userData,
                accessToken,
                refreshToken
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: "Internal server error. Please retry later",
            });
        }
    },
    async createAccount(req, res) {
        try {
            const {
                username,
                password,
                email
            } = req.body;

            if (!password || !username || !email) {
                return res.status(400).json({
                    message: "Check credentials!"
                });
            }

            const usernameIsTaken = await User.findOne({
                where: {
                    username: {
                        [Op.iLike]: username,
                    },
                },
            });

            if (usernameIsTaken) {
                return res.status(400).json({
                    message: "Username is taken!"
                });
            }

            const emailIsTaken = await User.findOne({
                where: {
                    email: {
                        [Op.iLike]: email,
                    },
                },
            });

            if (emailIsTaken) {
                return res.status(400).json({
                    message: "Email is taken!"
                });
            }

            const user = new User({
                username,
                email,
                password: bcrypt.hashSync(password, 8),
            });

            await user.save();

            return res.status(200).json({
                message: "Account created!",
                user
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: "Internal server error. Please retry later",
            });
        }
    },
    async updateInformations(req, res) {
        // TODO: Update the user informations in the database except the password
        try {
            const userUpdate = await User.findByPk(
                req.user.id
            );
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            userUpdate = {
                ...userUpdate,
                ...req.body
            }
            userUpdate.save();
            res.json(userUpdate);

        } catch (error) {
            return res.status(400).send({
                message: "Internal server error. Please retry later",
            });
        }
    },
    async updatePassword(req, res) {
        // TODO: Update the user password in the database. Ask for the old password, verify it, then re-insert the new one after checking its strength and hashing it

        try {
            const userUpdatePassword = await User.findByPk(
                req.user.id
            );
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            user = {
            ...userUpdatePassword.password
            }
            userUpdatePassword.save();
            res.json(userUpdatePassword);

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({
                    message: "Incorrect password",
                    password,
                });
            }

        } catch (error) {
            return res.status(400).send({
                message: "Internal server error. Please retry later",
            });
        }
    },
    async deleteAccount(req, res) {
        // TODO: Delete the user account. Request the current password, and change the account status to inactive.
            try {
                userToDelete = User.findByPk(
                    req.user.id
                );
                if (!user) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                };
                const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({
                    message: "Incorrect password",
                    password,
                });
            }

            } catch (error) {
                return res.status(400).send({
                    message: "Internal server error. Please retry later",
                }); 
            }
        // TODO: (Add a database migration, add a column "account_is_deactivated" and "date_of_deactivation" ). After 15 days, if the user has not reconnected, delete the account and the related data. So you have to add a function to set account_is_deactivated back to false in the login method
        res.json("Currently not implemented");
    },
};