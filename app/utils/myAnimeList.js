const axios = require("axios");
const log = require("log-beautify");
const {
    Anime,
    Rating,
    Source,
    NSFW,
    Media,
    Category,
    Studio,
} = require("../models");
const { MAL } = require("../constants");

const myAnimeList = {
    async search(query) {
        try {
            const results = await axios.get(
                `${MAL.apiURL}/anime?q='${query}&limit=24`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.MAL_ACCESS_TOKEN}`,
                    },
                }
            );

            const animeList = [];

            // Check if the anime found is already in the database or not
            for (const data of results.data.data) {
                let anime = await Anime.findOne({
                    where: { mal_id: data.node.id },
                });

                if (!anime) {
                    anime = await this.insert(data.node.id);
                }

                await animeList.push(anime);
            }

            return animeList;
        } catch (error) {
            console.error(error);
        }
    },

    // Function to retrieve all the anime available in MAL, in order to insert them in the database
    async insert(id) {
        const isAlreadyExists = await Anime.findOne({ where: { mal_id: id } });

        if (!isAlreadyExists) {
            try {
                const results = await axios.get(
                    `${MAL.apiURL}/anime/${id}?${MAL.apiParams}`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.MAL_ACCESS_TOKEN}`,
                        },
                    }
                );

                const formattedAnime = await myAnimeList.format(results.data);

                const newAnime = await new Anime(formattedAnime).save();

                await myAnimeList.linkInformations(newAnime); // TODO : Find a way to link related anime avoiding infinite queries...

                return newAnime;
            } catch (error) {
                console.error(error);
            }
        }
    },

    async format(anime) {
        try {
            const valuesToInsert = {
                rating: 1,
                source: 1,
                nsfw: 1,
                media_type: 1,
            };

            for (const value in valuesToInsert) {
                const condition = {
                    where: { label: anime[value] },
                };
                if (anime[value]) {
                    switch (value) {
                        case "rating":
                            valuesToInsert[value] = await Rating.findOne(
                                condition
                            ).id;
                            break;
                        case "source":
                            valuesToInsert[value] = await Source.findOne(
                                condition
                            ).id;
                            break;
                        case "nsfw":
                            valuesToInsert[value] = await Source.findOne(
                                condition
                            ).id;
                            break;
                        case "media_type":
                            valuesToInsert[value] = await Source.findOne(
                                condition
                            ).id;
                            break;
                    }
                }
            }

            if (!anime.main_picture) {
                anime.main_picture = {
                    medium: "unknown",
                    large: "unknown",
                };
            }

            const format = {
                mal_id: anime.id,
                en_title: anime.title,
                jp_title: anime.alternative_titles.ja,
                medium_picture_url: anime.main_picture.medium,
                large_picture_url: anime.main_picture.large,
                start_date: anime.start_date,
                end_date: anime.start_date,
                num_episodes: anime.num_episodes,
                synopsis: anime.synopsis,
                mean: anime.mean,
                rank: anime.rank,
                // rating_id: valuesToInsert.rating,
                // source_id: valuesToInsert.source,
                // nsfw_color_id: valuesToInsert.nsfw,
                // media_type_id: valuesToInsert.media_type,
                // broadcast_day: anime.broadcast.day_of_the_week,
                // broadcast_time: anime.broadcast.start_time,
            };

            return format;
        } catch (error) {
            console.error(error);
        }
    },

    async linkInformations(anime) {
        // Link his categories
        if (anime.genres) {
            for (const category of anime.genres) {
                // Check if the category is already present in the database
                let dbCategory = await Category.findOne({
                    where: { mal_id: category.id },
                });

                // If the category is not present in the database, we create it
                if (!dbCategory) {
                    dbCategory = await new Category({
                        mal_id: category.id,
                        label: category.name,
                    }).save();
                }

                // We link the anime to the category
                await newAnime.addCategory(dbCategory);
            }
        }

        // Link his studios
        if (anime.studios) {
            for (const studio of anime.studios) {
                let dbStudio = await Studio.findOne({
                    where: { mal_id: studio.id },
                });

                const studioName = studio.name || "Unknown";

                if (!dbStudio) {
                    dbStudio = await new Studio({
                        mal_id: studio.id,
                        label: studioName,
                    }).save();
                }

                await newAnime.addStudio(dbStudio);
            }
        }
    },
};

module.exports = myAnimeList;
