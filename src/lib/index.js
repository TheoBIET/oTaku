const { req } = require("./nautiljon/api/request");
const { searchScraper } = require("./nautiljon/api/scraper");
const urlParser = require("./nautiljon/api/urlParser");
const data = require("./nautiljon/utils/data");
const utils = require("./nautiljon/utils/utils");

const { dataPageScraper } = require("./nautiljon/api/scraper");
const { urlReg } = require("./nautiljon/utils/data");
const removeAccents = require("remove-accents");

const { vostfree } = require("./anime");
const websites = [vostfree];

module.exports = {
    /* Copyright (c) 2020 Bartholomé Gili */
    search: async (query, genre = "anime", totalLength = 15, options) => {
        //variables
        let url, page, results;

        //====================================================================
        //  checks
        //
        if (!query && query !== "")
            return utils.error("No query provided for the search");
        //check the query
        else if (typeof query !== "string")
            return utils.error("Query must be a string");
        //
        if (!data.genres.map((e) => e.name).includes(genre.toLowerCase?.()))
            return utils.error(
                "Genre is invalid (must be either 'anime' or 'manga')"
            ); //check for the genre
        //
        if (typeof totalLength !== "number") {
            //check the totalLength and set a limit
            if (typeof totalLength == "object") {
                //swap the options and totalLength args
                let temp = totalLength;
                totalLength = typeof options == "number" ? options : 15;
                options = temp;
            } else utils.error("totalLength must be an integer");
        }
        if (totalLength > 50) totalLength = 50;
        //
        //====================================================================

        //get the html of the page
        url = urlParser.parse(query, genre, options);
        page = await req(url);

        //scrape the html
        results = searchScraper(page, genre, totalLength);

        return results;
    },

    /**
     * Assign the project to an employee.
     * @param {string} url - A valid nautiljon url (either manga or anime).
     */
    /* Copyright (c) 2020 Bartholomé Gili */
    getInformations: async (url) => {
        //checks
        if (!url) return utils.error("No url given");
        if (typeof url !== "string") return utils.error("Url must be a string");
        url = removeAccents(url.trim());
        if (!urlReg.test(url) || url.includes(" "))
            return utils.error("Invalid url");

        //get the html of the page
        const page = await req(url);

        //scrape it
        return dataPageScraper(page, url);
    },

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

    getStreaming: async (plateform, url) => {
        const website = websites.find((el) => el.plateform === plateform);
        if (!website) return utils.error("Invalid plateform");
        const results = await website.getStreamingLinks(url);
        return results;
    },
};
/*
    Copyright (c) 2020 Bartholomé Gili
    Licensed under the MIT License (MIT)
    https://github.com/barthofu/nautiljon-scraper
*/
