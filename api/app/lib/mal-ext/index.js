const axios = require("axios");
const { MAL } = require("../../constants");

const mal = {
    search: async (query, token) => {
        try {
            const results = await axios.get(
                `https://api.myanimelist.net/v2/anime?q='${query}'&limit=70&${MAL.apiParams}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return results.data.data;
        } catch (error) {
            console.error(error);
        }
    },

    getDetails: async (id, token) => {
        try {
            const results = await axios.get(
                `${MAL.apiURL}/anime/${id}?${MAL.apiParams}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(results);
            return results.data;
        } catch (error) {
            console.error(error);
        }
    },
};

module.exports = mal;
