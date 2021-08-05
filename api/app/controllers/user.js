const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
    getProfile(req, res) {
        res.send("OK");
    },
    login(req, res) {
        res.send("OK");
    },
    async createAccount(req, res) {
        try {
            if (!req.body.password || !req.body.username || !req.body.email) {
                return res.status(400).send({ message: "Check credentials!" });
            }

            const usernameIsTaken = await User.findOne({
                username: req.body.username,
            });

            if (usernameIsTaken) {
                return res.status(400).send({ message: "Username is taken!" });
            }

            const emailIsTaken = await User.findOne({ email: req.body.email });

            if (emailIsTaken) {
                return res.status(400).send({ message: "Email is taken!" });
            }

            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
            });

            await user.save();

            return res.status(200).send({ message: "Account created!", user });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Something went wrong!" });
        }
    },
    updateInformations(req, res) {
        res.send("OK");
    },
    updatePassword(req, res) {
        res.send("OK");
    },
    deleteAccount(req, res) {
        res.send("OK");
    },
};
