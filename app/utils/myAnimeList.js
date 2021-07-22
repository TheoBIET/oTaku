const axios = require('axios');
const api_url = "https://api.myanimelist.net/v2";
const api_params = "fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics"
const MAX_API_CALLS = 22;
const log = require('log-beautify');
const {
    Anime, Rating, Source, NSFW, Media, Category, Studio
} = require('../models');
const { MAL } = require("../constants");
const fs = require('fs');

module.exports = {
    async startScraping() {
        let id = 21;
        log.info("Scraping will start");
        while (id <= MAX_API_CALLS) {
            await this.getAnimeInformations(id);
            id++;
        }
    },

    // Function to retrieve all the anime available in MAL, in order to insert them in the database
    async insert(id) {
        const isAlreadyExists = await Anime.findOne({ where: { mal_id: id } });

        // If the anime is already present in the database, we don't need to insert it again
        if (!isAlreadyExists) {
            axios.get(`${api_url}/anime/${id}?${api_params}`, { headers: { Authorization: `Bearer ${process.env.MAL_ACCESS_TOKEN}` } })
                .then(async (results) => {
                    const anime = results.data;

                    log.info(`(${anime.id}) ${anime.title} found`);

                    log.info(`(${anime.id}) Preparing to insert`);

                    let ratingID = 1;
                    if (anime.rating) {
                        dbRating = await Rating.findOne({ where: { label: anime.rating } });
                        ratingID = dbRating.id;
                    }

                    let sourceID = 1
                    if (anime.source) {
                        dbSource = await Source.findOne({ where: { label: anime.source } });
                        sourceID = dbSource.id;
                    }

                    let nsfwID = 1;
                    if (anime.nsfw) {
                        dbNsfw = await NSFW.findOne({ where: { label: anime.nsfw } });
                        nsfwID = dbNsfw.id;
                    }

                    let mediaTypeID = 1;
                    if (anime.media_type) {
                        dbMediaType = await Media.findOne({ where: { label: anime.media_type } });
                        mediaTypeID = dbMediaType.id;
                    }

                    if(!anime.main_picture) {
                        anime.main_picture = {
                            "medium": "unknown",
                            "large": "unknown",
                        }
                    }

                    const newAnime = new Anime({
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
                        rating_id: ratingID,
                        source_id: sourceID,
                        nsfw_color_id: nsfwID,
                        media_type_id: mediaTypeID,
                    });

                    if (anime.broadcast) {
                        newAnime.broadcast_day = anime.broadcast.day_of_the_week;
                        newAnime.broadcast_time = anime.broadcast.start_time;
                    }

                    await newAnime.save();

                    // Link his categories
                    if (anime.genres) {
                        for (const category of anime.genres) {
                            // Check if the category is already present in the database
                            let dbCategory = await Category.findOne({ where: { mal_id: category.id } });

                            // If the category is not present in the database, we create it
                            if (!dbCategory) {
                                dbCategory = await new Category({ mal_id: category.id, label: category.name }).save();
                            }

                            // We link the anime to the category
                            await newAnime.addCategory(dbCategory);
                        }
                    }

                    // Link his studios
                    if (anime.studios) {
                        for (const studio of anime.studios) {
                            let dbStudio = await Studio.findOne({ where: { mal_id: studio.id } });

                            const studioName = studio.name || 'Unknown';

                            if (!dbStudio) {
                                dbStudio = await new Studio({ mal_id: studio.id, label: studioName }).save();
                            }

                            await newAnime.addStudio(dbStudio);
                        }
                    }

                    // Link his related anime
                    // for (const related_anime of anime.related_anime) {
                    //     let dbRelatedAnime = await Anime.findOne({ where: { mal_id: id } });

                    //     if (!dbRelatedAnime) {
                    //         const m = JSON.parse(fs.readFileSync('related.json').toString());
                    //         m.forEach(function (p) {
                    //             p.pic = p.name.toLowerCase() + ".png";
                    //         });
                    //         fs.writeFile('people.json', JSON.stringify(m));
                    //     }

                    //     await dbAnime.addCategory(dbCategory);
                    // }

                    // // Link his categories
                    // for(const recommendation of anime.recommendations) {
                    //     // Check if the category is already present in the database
                    //     let dbCategory = await Category.findOne({ where: { mal_id: category.id } });

                    //     // If the category is not present in the database, we create it
                    //     if (!dbCategory) {
                    //         dbCategory = await new Category({ mal_id: category.id, label: category.name }).save();
                    //     }

                    //     // We link the anime to the category
                    //     await dbAnime.addCategory(dbCategory);
                    // }

                    return newAnime;
                })
                .catch(err => {
                    console.error(err);
                    log.error(err);
                    log.warning(`(${id}) Not found !`);
                })
        } else {
            log.warning(`(${id}) Already exists !`);
        }
    },

    search(query, callback) {
        axios.get(`${api_url}/anime?q='${query}&limit=24`, { headers: { Authorization: `Bearer ${process.env.MAL_ACCESS_TOKEN}` } })
            .then(async (results) => {
                const animeList = [];

                for (const data of results.data.data) {
                    const anime = await Anime.findOne({
                        where: { mal_id: data.node.id }
                    });
                    if (!anime) {
                        await this.insert(data.node.id);
                    }
                }

                for(const data of results.data.data) {
                    const anime = await Anime.findOne({
                        where: { mal_id: data.node.id },
                        include: [
                            'studios',
                            'rating',
                            'source',
                            'nsfw_color',
                            'media_type',
                            'categories',
                            'episodes'
                        ]
                    }
                    );

                    if(anime) {
                        await animeList.push(anime);
                    }
                }

                callback(null, animeList);
            })
            .catch(err => {
                callback(err, null);
                log.error(err);
            });
    }
}


