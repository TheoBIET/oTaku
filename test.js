require('dotenv').config();
const { Rating } = require('./app/models');
const { myAnimeList, vostFree } = require('./app/utils');


(async () => {
    const req = 'Shingeki no Kyojin'

    const links = await vostFree.getAnimeLinksList(req);
    console.log(links);
})()