require('dotenv').config();
const {myAnimeList} = require('./app/utils');


(async() => {
    await myAnimeList.startScraping();
})()