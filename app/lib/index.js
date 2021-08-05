const { vostfree } = require("./anime");
const websites = [vostfree];

module.exports = {
    /**
     * Get the list of the anime/manga who are available to stream on every websites.
     * @param {string} name - The name of the anime/manga.
     */
    getAnimes: async (name) => {
        const results = [];

        for (const website of websites) {
            const data = await website.getAnimeLinks(name);
            if (data.links.length) results.push(data);
        }

        return results;
    },

    /**
     * Get the list of the anime/manga who are available to stream on every websites.
     * @param {string} plateform - The plateform of the anime/manga you wan't to search.
     * @param {string} url - The anime url on the given plateform
     */
    getStreaming: async (plateform, url) => {
        const website = websites.find((el) => el.plateform === plateform);
        if (!website) return console.error("Invalid plateform");
        const results = await website.getStreamingLinks(url);
        return results;
    },
};
