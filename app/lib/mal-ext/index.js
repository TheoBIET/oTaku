const axios = require("axios");
const { MAL } = require("../../constants");

const mal = {
    search: async (query, token) => {
        try {
            const results = await axios.get(
                `${MAL.apiURL}/anime?q='${query}&limit=100&${MAL.apiParams}`,
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
};

module.exports = mal;
