const express = require('express');
const router = express.Router();

const {
    errorController,
    homeController
} = require('../controllers');

router
    // Display API Informations
    .get('/', homeController.aboutAPI)

router.use(errorController.resourceNotFound);

module.exports = router;