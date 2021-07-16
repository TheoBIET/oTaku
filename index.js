require('dotenv').config();
const axios = require('axios');
const api_url = "https://api.myanimelist.net/v2";

// Test function to try to request information from id 0 to 200
const getAnimeList = async (id) => {
    axios.get(`${api_url}/anime/${id}`, { headers: { Authorization: `Bearer ${process.env.MAL_ACCESS_TOKEN}` } })
        .then(res => {
            console.log(`Anime n°${id} found -> ${res.data.title}`);
        })
        .catch(err => {
            console.log(`Anime n°${id} not found`);
        })
        .then(() => {
            id++;
            if (id < 200) {
                getAnimeList(id);
            }
        });
}

getAnimeList(0);