const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");
const { tokenMiddleware } = require("../middlewares");

router
    .post("/user/login", userController.login)

    .post("/user/signup", userController.createAccount)

    .get(
        "/user/:username",
        tokenMiddleware.authenticateToken,
        userController.getProfile
    )

    .delete(
        "/user/delete",
        tokenMiddleware.authenticateToken,
        userController.deleteAccount
    )

    .put(
        "/user/update/password",
        tokenMiddleware.authenticateToken,
        userController.updatePassword
    )

    .put(
        "/user/update",
        tokenMiddleware.authenticateToken,
        userController.updateInformations
    );

module.exports = router;
