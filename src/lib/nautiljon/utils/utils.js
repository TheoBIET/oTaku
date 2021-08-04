/*
    Copyright (c) 2020 Bartholomé Gili
    Licensed under the MIT License (MIT)
    https://github.com/barthofu/nautiljon-scraper
*/
const data = require("./data");

module.exports = {
    error(text) {
        throw new TypeError(text);
    },
};
