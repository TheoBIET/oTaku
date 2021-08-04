/*
    Copyright (c) 2020 Bartholomé Gili
    Licensed under the MIT License (MIT)
    https://github.com/barthofu/nautiljon-scraper
*/

const data = require("../utils/data");

module.exports = {
    parse(query, genre, options) {
        let args = this.argsParser(genre, options);
        return (
            `https://www.nautiljon.com/${
                data.genres.find((e) => e.name === genre).apiName
            }/?q=` +
            query.split(" ").join("+") +
            "&" +
            args.join("&") +
            "&tri=0"
        );
    },

    argsParser(genre, options) {
        if (!options) options = data.defaultOptions[genre];

        let args = [];

        for (let k in options) {
            let option = options[k],
                isExcluded = false,
                key = k;
            if (k.includes("Exclude")) {
                key = key.slice(0, -7);
                isExcluded = true;
            }
            let optionConfig = data.optionsConfig[genre][key];

            //check if option exists
            if (!optionConfig) continue;

            switch (optionConfig.type) {
                case Number:
                    //check if value is correct
                    if (typeof option != "number") continue;

                    args.push(
                        optionConfig.queryPattern
                            .replace("NUMBER", option)
                            .replace("MIN", option)
                            .replace("MAX", option + 1)
                    );

                    break;

                case Boolean:
                    //check if value is correct
                    if (typeof option != "boolean") continue;

                    if (option == false)
                        args.push(
                            optionConfig.queryPattern.replace(
                                "STATE",
                                "exclude"
                            )
                        );
                    else if (option)
                        args.push(
                            optionConfig.queryPattern.replace(
                                "STATE",
                                "include"
                            )
                        );
                    break;

                case Array:
                    //check if value is correct
                    if (!Array.isArray(option)) continue;

                    let type = optionConfig.queryPattern.split("=")[1];

                    for (let i in option) {
                        let value = option[i].toLowerCase();

                        console.log(type);

                        if (type == "INDEX") {
                            //check if value exist in the array
                            console.log(value.toLowerCase());
                            if (
                                !optionConfig.data.includes(value.toLowerCase())
                            )
                                continue;
                            console.log(2);
                            args.push(
                                optionConfig.queryPattern
                                    .replace(
                                        "STATE",
                                        isExcluded ? "exclude" : "include"
                                    )
                                    .replace(
                                        "INDEX",
                                        optionConfig.data.indexOf(
                                            value.toLowerCase()
                                        ) + 1
                                    )
                            );
                        } else if (type == "VALUE") {
                            //check if value exist in the object
                            if (!optionConfig.data[value.toLowerCase()])
                                continue;
                            args.push(
                                optionConfig.queryPattern
                                    .replace(
                                        "STATE",
                                        isExcluded ? "exclude" : "include"
                                    )
                                    .replace("VALUE", optionConfig.data[value])
                            );
                        }
                    }
            }
        }

        return args;
    },
};
