/*
    Copyright (c) 2020 Bartholomé Gili
    Licensed under the MIT License (MIT)
    https://github.com/barthofu/nautiljon-scraper
*/
module.exports = {
    urlReg: /https:\/\/(www.nautiljon|nautiljon).com\/(animes|mangas)\//,

    genres: [
        {
            name: "anime",
            apiName: "animes",
        },
        {
            name: "manga",
            apiName: "mangas",
        },
    ],

    defaultOptions: {
        anime: {
            formats: [],
            formatsExclude: [],
            genres: [],
            genresExclude: [],

            year: null,
            airing: null,
            finished: null,
            tba: null,
        },

        manga: {
            types: [],
            typesExclude: [],
            genres: [],
            genresExclude: [],

            year: null,
            airing: null,
            finished: null,
            tba: null,
        },
    },

    optionsConfig: {
        anime: {
            formats: {
                queryPattern: "formats_STATE[]=INDEX",
                type: Array,
                data: ["tv show", "oav", "movie", "special", "ona", "music"],
            },
            airing: {
                queryPattern: "enccours_STATE[]=1",
                type: Boolean,
            },
            finished: {
                queryPattern: "enccours_STATE[]=2",
                type: Boolean,
            },
            tba: {
                queryPattern: "enccours_STATE[]=3",
                type: Boolean,
            },
            year: {
                queryPattern: "annee_min_aaaa=MIN&annee_max_aaaa=MAX",
                type: Number,
            },
            genres: {
                queryPattern: "genres_STATE[]=VALUE",
                type: Array,
                data: {
                    action: 28,
                    aventure: 2,
                    biographie: 33,
                    comedie: 1,
                    drame: 4,
                    ecchi: 6,
                    erotique: 14,
                    fantastique: 24,
                    fantasy: 7,
                    hentai: 20,
                    historique: 22,
                    horreur: 30,
                    josei: 19,
                    "magical girls": 21,
                    mature: 53,
                    moe: 32,
                    mystère: 29,
                    psychologique: 23,
                    romance: 13,
                    "school life": 16,
                    "science-fiction": 3,
                    seinen: 11,
                    shojo: 9,
                    shonen: 8,
                    "slice of Life": 10,
                    "space opera": 34,
                    surnaturel: 31,
                    shriller: 27,
                    tournois: 5,
                    yaoi: 15,
                    yuri: 12,
                },
            },
        },

        manga: {
            types: {
                queryPattern: "types_STATE[]=INDEX",
                type: Array,
                data: [
                    "anime comics",
                    "anthologie",
                    "global-manga",
                    "hentai",
                    "josei",
                    "kodomo",
                    "parodique",
                    "seinen",
                    "shojo",
                    "shonen",
                    "webcomic",
                    "yaoi",
                    "yuri",
                ],
            },
            airing: {
                queryPattern: "enccours_vos_STATE[]=1",
                type: Boolean,
            },
            finished: {
                queryPattern: "enccours_vos_STATE[]=2",
                type: Boolean,
            },
            tba: {
                queryPattern: "enccours_vos_STATE[]=3",
                type: Boolean,
            },
            year: {
                queryPattern: "annee_vo_min=MIN&annee_vo_max=MAX",
                type: Number,
            },
            genres: {
                queryPattern: "genres_STATE[]=VALUE",
                type: Array,
                data: {
                    action: 2,
                    aventure: 3,
                    biographie: 49,
                    comédie: 1,
                    crossover: 58,
                    drama: 5,
                    ecchi: 7,
                    erotique: 25,
                    fantastique: 41,
                    fantasy: 11,
                    "histoires courtes": 45,
                    historique: 9,
                    horreur: 20,
                    mature: 53,
                    mystère: 10,
                    psychologique: 21,
                    romance: 19,
                    "school life": 18,
                    "science-fiction": 4,
                    shojo: 46,
                    shonen: 47,
                    "slice of life": 24,
                    surnatural: 12,
                    thriller: 43,
                    tournois: 30,
                    tragique: 51,
                    yonkoma: 56,
                },
            },
        },
    },
};
