const puppeteer = require("puppeteer");
const { streamingWebsites } = require("../constants");

module.exports = {
    getAnimeLinksList: async (name) => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        const probableSeasonRequested = name
            .split(" ")
            .map((word) => {
                if (parseInt(word) >= 0) {
                    return word;
                }
            })
            .join("");

        // 1 - Go to website homepage
        await page.goto("https://vostfree.tv/");

        // 2 - Find the input (className="search-box") and type "vostfree"
        await page.type("input.search-box", name);

        // 3 - Click the "Search" button (className="search-button")
        // We must use .waitForNavigation for prevent context destroy
        await Promise.all([
            page.click("input.search-icon"),
            page.waitForNavigation(),
        ]);

        // 4 - Get all results (div className="search-results")
        const links = await page.$$eval(".search-result .title a", (links) =>
            links.map((link, index) => {
                let title = link.innerText.toLowerCase();
                const titleToArray = title.split(" ");
                // Default language value is VF
                let language = "VF";

                // Check if is really a VF
                if (titleToArray.includes("vostfr" || "vost")) {
                    language = "VOSTFR";
                }

                // Format the links and return them
                return {
                    id: index,
                    url: link.href,
                    title,
                    language,
                    season: "Unknow",
                    plateform: "VOSTFREE",
                };
            })
        );

        for (const link of links) {
            const probableSeasonFounded = link.title
                .split(" ")
                .map((word) => {
                    if (parseInt(word) >= 0) {
                        return word;
                    }
                })
                .join("");

            if (probableSeasonFounded) {
                link.season = parseInt(probableSeasonFounded, 10);
            }

            link.title = link.title
                .split(" ")
                .map((word) => {
                    if (
                        word === "french" ||
                        word === "vost" ||
                        word === "vostfr" ||
                        word === "vf"
                    ) {
                        return "";
                    } else {
                        return word;
                    }
                })
                .join(" ");

            link.probableSeason = probableSeasonFounded;

            if (isNaN(probableSeasonFounded)) {
                link.probableSeason = 1;
            }

            if (probableSeasonRequested) {
                const cleanLinks = links.filter((link) => {
                    return probableSeasonRequested === probableSeasonFounded;
                });
                return cleanLinks;
            }
        }

        await browser.close();
        return links;
    },

    getStreamingList: async (animeURL) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // 1 - Go to the anime's link
        await page.goto(animeURL);

        // 2 - Get all available links in the dropdown menu
        const episodeList = await page.$$eval(
            ".jq-selectbox__dropdown ul li",
            (episodes) =>
                episodes.map((episode) => {
                    let link = document
                        .getElementById("film_iframe")
                        .getAttribute("src");
                    console.log(link);

                    if (link.startsWith("//")) {
                        link = "https:" + link;
                    }

                    // 3 - Click on all available links and get his informations
                    document.querySelector(".jq-selectbox__dropdown").click();
                    episode.click();
                    return {
                        title: episode.innerText,
                        // 4 - Get the streaming, he is the source of iframe with id "film_iframe"
                        link: link,
                    };
                })
        );

        await browser.close();

        return episodeList;
    },
};
