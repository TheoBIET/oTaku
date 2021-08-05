const { User } = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

module.exports = {
    async getProfile(req, res) {
        const { username } = req.params;

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
    },
    login(req, res) {
        res.json("OK");
    },
    async createAccount(req, res) {
        try {
            if (!req.body.password || !req.body.username || !req.body.email) {
                return res.status(400).json({ message: "Check credentials!" });
            }

            const usernameIsTaken = await User.findOne({
                where: {
                    username: {
                        [Op.iLike]: req.body.username,
                    },
                },
            });

            if (usernameIsTaken) {
                return res.status(400).json({ message: "Username is taken!" });
            }

            const emailIsTaken = await User.findOne({
                where: {
                    email: {
                        [Op.iLike]: req.body.email,
                    },
                },
            });

            if (emailIsTaken) {
                return res.status(400).json({ message: "Email is taken!" });
            }

            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
            });

            await user.save();

            return res.status(200).json({ message: "Account created!", user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Something went wrong!" });
        }
    },
    updateInformations(req, res) {
        // TODO: Update the user informations in the database except the password
        res.json("OK");
    },
    updatePassword(req, res) {
        // TODO: Update the user password in the database. Ask for the old password, verify it, then re-insert the new one after checking its strength and hashing it
        res.json("OK");
    },
    deleteAccount(req, res) {
        // TODO: Delete the user account. Request the current password, and change the account status to inactive.
        // TODO: (Add a database migration, add a column "account_is_deactivated" and "date_of_deactivation" ). After 15 days, if the user has not reconnected, delete the account and the related data. So you have to add a function to set account_is_deactivated back to false in the login method
    },
};
