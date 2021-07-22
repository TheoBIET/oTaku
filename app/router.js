const express = require('express');
const router = express.Router();

const {
    homeController,
    errorController,
    searchController
} = require('./controllers');

router
    .get('/', homeController.index)

    .get('/base', homeController.getInformationsForHomepage)

    .post('/search', searchController.search)

    .get('/streaming/:id', searchController.getLinks)

    // 404 controller
    .use(errorController.resourceNotFound)

module.exports = router;