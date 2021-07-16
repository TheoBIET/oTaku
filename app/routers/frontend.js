const express = require('express');
const router = express.Router();

const {
    errorController,
    homeController
} = require('../controllers');

router
    // Display the home page
    .get('/', homeController.index)

router.use(errorController.resourceNotFound);

module.exports = router;