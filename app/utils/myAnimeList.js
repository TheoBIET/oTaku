const axios = require('axios');
const api_url = "https://api.myanimelist.net/v2";
const api_params = "fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics"
const MAX_API_CALLS = 50000;
const log = require('log-beautify');
const {animeService} = require('../services');

module.exports = {
    async startScraping() {
        log.info("Scraping will start");
        this.getAll();
    },

    // Function to retrieve all the anime available in MAL, in order to insert them in the database
    getAll(id = 7340) {
        axios.get(`${api_url}/anime/${id}?${api_params}`, { headers: { Authorization: `Bearer ${process.env.MAL_ACCESS_TOKEN}` } })
            .then(async (results) => {
                const anime = results.data;
                const isAlreadyExists = await animeService.checkIfAlreadyExists(anime.id);

                log.info(`(${anime.id}) ${anime.title} found`);

                // If the anime is already present in the database, we don't need to insert it again
                if (isAlreadyExists) {
                    log.warning(`(${id}) Already Exists !`);
                    return;
                }

                log.info(`(${anime.id}) Preparing to insert`);
                // Before insert, we must format the data so that they match the database schema
                await animeService.insertAnime(anime);
            })
            .catch(err => {
                log.warning(`(${id}) Not found !`);
            })
            .then(_ => {
                id++;
                if (id <= MAX_API_CALLS) {
                    this.getAll(id);
                }
            });
    }
}