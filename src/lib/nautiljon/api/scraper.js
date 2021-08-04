/*
    Copyright (c) 2020 Bartholomé Gili
    Licensed under the MIT License (MIT)
    https://github.com/barthofu/nautiljon-scraper
*/

module.exports = {
    searchScraper($, genre, totalLength) {
        let scrapedUrls;

        if (genre === "anime") {
            if (!$("tbody")[1]?.children) return [];

            scrapedUrls = $("tbody")[1].children.map((e) => {
                let arr = $(e).find(".acenter").toArray();
                return {
                    name: $(e).find(".left.vtop span + a").text() || null,
                    url: $(e).find(".left.vtop span + a")
                        ? "https://nautiljon.com" +
                          $(e).find(".left.vtop span + a").attr("href")
                        : null,
                    imageUrl: $(e).find(".image img").attr("src")
                        ? "https://nautiljon.com" +
                          $(e)
                              .find(".image img")
                              .attr("src")
                              .replace("imagesmin", "images")
                        : null,
                    description:
                        $(e)
                            .find(".left.vtop p")
                            .text()
                            ?.replace(" Lire la suite", "") || null,
                    format: $(arr[1]).text() || null,
                    diffusion: $(arr[2]).text() || null,
                    episodesNumber: $(arr[4]).text() || null,
                    startDate: $(arr[5]).text() || null,
                    endDate: $(arr[6]).text() || null,
                    score: $(arr[7]).text() || null,
                };
            });
        } else if (genre === "manga") {
            if (!$("tbody")[1]?.children) return [];

            scrapedUrls = $("tbody")[1].children.map((e) => {
                let arr = $(e).find(".acenter").toArray();
                return {
                    name: $(e).find(".left.vtop span + a").text(),
                    url: $(e).find(".left.vtop span + a")
                        ? "https://nautiljon.com" +
                          $(e).find(".left.vtop span + a").attr("href")
                        : null,
                    imageUrl: $(e).find(".image img").attr("src")
                        ? "https://nautiljon.com" +
                          $(e)
                              .find(".image img")
                              .attr("src")
                              .replace("imagesmin", "images")
                        : null,
                    description:
                        $(e)
                            .find(".left.vtop p")
                            .text()
                            ?.replace(" Lire la suite", "") || null,
                    type: $(arr[1]).text() || null,
                    volumesNumber: $(arr[2]).text() || null,
                    startDate: $(arr[6]).text() || null,
                    score: $(arr[7]).text() || null,
                };
            });
        }

        return scrapedUrls.slice(0, totalLength);
    },

    dataPageScraper($, url) {
        let genre = url.split("/")[3];

        if (genre === "animes") {
            //french episodes name
            let frenchNamesColumn = $("h2")
                .filter(function () {
                    return $(this).text().indexOf("Épisodes") > -1;
                })
                .next()
                .find(".vtop.aleft")[1]
                ?.children.map((e) => e)[0]
                .children.map((e) => e)[0]
                .children.slice(1);
            //relations
            let state = true,
                lastTitle,
                relations = {};
            $(".top_bloc")
                .filter(function () {
                    return $(this).text().indexOf("Fiches liées") > -1;
                })
                .find(".relative.imagesBorder")
                .toArray()
                .filter((e) => {
                    if (!state) return false;
                    let matchTitle = $(e).find("h3").text();
                    if (matchTitle.length > 0) {
                        if (
                            !["Animes", "Manga", "Mangas", "Anime"].includes(
                                matchTitle
                            )
                        ) {
                            state = false;
                            return false;
                        }
                        relations[matchTitle] = [];
                        lastTitle = matchTitle;
                    }
                    relations[lastTitle].push({
                        name: $(e).find("a").text() || null,
                        url: $(e).find("a").attr("href")
                            ? "https://nautiljon.com/" +
                              $(e).find("a").attr("href")
                            : null,
                        relationType:
                            $(e).html().split("</div>")[2]?.trim() ||
                            $(e).html().split("</div>")[1]?.trim() ||
                            null,
                        imageUrl: $(e).find("img").attr("src")
                            ? "https://nautiljon.com/" +
                              $(e)
                                  .find("img")
                                  .attr("src")
                                  .replace("imagesmin", "images")
                            : null,
                        additionnalInformations:
                            $(e).find("div:not([style])").text() || null,
                    });
                });

            return {
                name: $('.h1titre > [itemprop="name"]')?.text() || null,
                japName:
                    $("span")
                        .filter(function () {
                            return (
                                $(this).text().indexOf("Titre original : ") > -1
                            );
                        })
                        .parent()
                        .html()
                        ?.split("</span>")[1]
                        .trim() || null,
                alternateName: $('[itemprop="alternateName"]').html() || null,
                url: url,
                imageUrl: $(".image_fiche.fleft a img").attr("src")
                    ? `https://nautiljon.com${$(".image_fiche.fleft a img")
                          .attr("src")
                          .replace("/mini", "")}`
                    : null,
                country: $(".flag").next().text() || null,
                format:
                    $("span")
                        .filter(function () {
                            return $(this).text().indexOf("Format : ") > -1;
                        })
                        .next()
                        .text() || null,
                source:
                    $("span")
                        .filter(function () {
                            return $(this).text().indexOf("Origine : ") > -1;
                        })
                        .next()
                        .text() || null,
                startDate: $('[itemprop="datePublished"]').text() || null,
                endDate:
                    $('[itemprop="datePublished"]')
                        .parent()
                        .html()
                        ?.split("</span>")[2]
                        .split("au")[1]
                        ?.trim() || null,
                genres: $('[itemprop="genre"]')
                    .toArray()
                    .map((e) => $(e).text()),
                studio:
                    $("span")
                        .filter(function () {
                            return (
                                $(this)
                                    .text()
                                    .indexOf("Studio d'animation : ") > -1
                            );
                        })
                        .parent()
                        .find('[itemprop="legalName"]')
                        .text() || null,
                vodPlatform: $("span")
                    .filter(function () {
                        return (
                            $(this).text().indexOf("Simulcast / streaming : ") >
                            -1
                        );
                    })
                    .parent()
                    .find("a")
                    .toArray()
                    .map((e) => $(e).text()),
                description:
                    $(
                        $(".description")
                            .html()
                            ?.split('<div class="groupe"')[0]
                            .trim()
                    ).text() || null,
                pictures: $("h3")
                    .filter(function () {
                        return $(this).text().indexOf("Captures d'écran") > -1;
                    })
                    .next()
                    .find("a")
                    .toArray()
                    .map((e) => "https://nautiljon.com" + e.attribs.href),
                trailer: $(".unTrailerA")[0]?.attribs.href || null,
                episodes: {
                    totalNumber:
                        $('[itemprop="numberOfEpisodes"]').text() || null,
                    duration:
                        $('[itemprop="numberOfEpisodes"]')
                            .parent()
                            .html()
                            ?.split("</span>")[2]
                            .split(" x ")[1] || null,
                    listEpisodes:
                        $("h2")
                            .filter(function () {
                                return $(this).text().indexOf("Épisodes") > -1;
                            })
                            .next()
                            .find(".vtop.aleft")[0]
                            ?.children.map((e) => e)[0]
                            .children.map((e) => e)[0]
                            .children.slice(1)
                            .map((e, i) => {
                                return {
                                    name: $(e.children[2]).text() || null,
                                    frenchName:
                                        $(
                                            frenchNamesColumn[i]?.children[2]
                                        ).text() || null,
                                    episode: $(e.children[1]).text() || null,
                                    date: $(e.children[0]).text() || null,
                                };
                            }) || [],
                },
                relations: relations,
                news: {
                    french: $("#fiche_news li")
                        .toArray()
                        .map((e) => {
                            return {
                                name:
                                    $(e)
                                        .find(".sim[href]")
                                        .text()
                                        ?.split(":")
                                        .map((e) => e.trim())
                                        ?.slice(1)
                                        .join(" ") || null,
                                url: $(e).find(".sim[href]")
                                    ? "https://nautiljon.com" +
                                      $(e).find(".sim[href]").attr("href")
                                    : null,
                                date:
                                    $(e)
                                        .find(".sim[href]")
                                        .text()
                                        ?.split(":")[0]
                                        ?.trim() || null,
                                description:
                                    $(e).find(".introNews").text() || null,
                                imageUrl: $(e).find("img")
                                    ? "https://nautiljon.com" +
                                      $(e).find("img").attr("src")
                                    : null,
                            };
                        }),
                },
            };
        } else if (genre === "mangas") {
            //relations
            let state = true,
                lastTitle,
                relations = {};
            $(".top_bloc")
                .filter(function () {
                    return $(this).text().indexOf("Fiches liées") > -1;
                })
                .find(".relative.imagesBorder")
                .toArray()
                .filter((e) => {
                    if (!state) return false;
                    let matchTitle = $(e).find("h3").text();
                    if (matchTitle.length > 0) {
                        if (
                            !["Animes", "Manga", "Mangas", "Anime"].includes(
                                matchTitle
                            )
                        ) {
                            state = false;
                            return false;
                        }
                        relations[matchTitle] = [];
                        lastTitle = matchTitle;
                    }
                    relations[lastTitle].push({
                        name: $(e).find("a").text() || null,
                        url: $(e).find("a").attr("href")
                            ? "https://nautiljon.com/" +
                              $(e).find("a").attr("href")
                            : null,
                        relationType:
                            $(e).html().split("</div>")[2]?.trim() ||
                            $(e).html().split("</div>")[1]?.trim() ||
                            null,
                        imageUrl: $(e).find("img").attr("src")
                            ? "https://nautiljon.com/" +
                              $(e)
                                  .find("img")
                                  .attr("src")
                                  .replace("imagesmin", "images")
                            : null,
                        additionnalInformations:
                            $(e).find("div:not([style])").text() || null,
                    });
                });

            return {
                name: $('.h1titre > [itemprop="name"]')?.text() || null,
                japName:
                    $("span")
                        .filter(function () {
                            return (
                                $(this).text().indexOf("Titre original : ") > -1
                            );
                        })
                        .parent()
                        .html()
                        ?.split("</span>")[1]
                        .trim() || null,
                alternateName: $('[itemprop="alternateName"]').html() || null,
                url: url,
                imageUrl: $(".image_fiche.fleft a img").attr("src")
                    ? `https://nautiljon.com${$(".image_fiche.fleft a img")
                          .attr("src")
                          .replace("/mini", "")}`
                    : null,
                country:
                    $(".flag")
                        .parent()
                        .text()
                        ?.split(":")[1]
                        ?.split("-")[0]
                        ?.trim() || null,
                type:
                    $("span")
                        .filter(function () {
                            return $(this).text().indexOf("Type : ") > -1;
                        })
                        .next()
                        .text() || null,
                startDate: $('[itemprop="datePublished"]').text() || null,
                status:
                    $("span")
                        .filter(function () {
                            return (
                                $(this).text().indexOf("Nb volumes VO : ") > -1
                            );
                        })
                        .parent()
                        .html()
                        ?.split("</span>")[1]
                        ?.split("(")[1]
                        ?.slice(0, -1) || null,
                volumesNumber:
                    $("span")
                        .filter(function () {
                            return (
                                $(this).text().indexOf("Nb volumes VO : ") > -1
                            );
                        })
                        .parent()
                        .html()
                        ?.split("</span>")[1]
                        ?.split("(")[0]
                        ?.trim() || null,
                genres: $('[itemprop="genre"]')
                    .toArray()
                    .map((e) => $(e).text()),
                author: {
                    story:
                        $('li [itemprop="author"] [itemprop="name"]').text() ||
                        null,
                    art:
                        $(
                            'li [itemprop="illustrator"] [itemprop="name"]'
                        ).text() ||
                        $('li [itemprop="author"] [itemprop="name"]').text() ||
                        null,
                },
                editor: {
                    VO:
                        $("span")
                            .filter(function () {
                                return (
                                    $(this).text().indexOf("Éditeur VO : ") > -1
                                );
                            })
                            .parent()
                            .find('[itemprop="legalName"]')
                            .text() || null,
                    VF:
                        $("span")
                            .filter(function () {
                                return (
                                    $(this).text().indexOf("Éditeur VF : ") > -1
                                );
                            })
                            .parent()
                            .find('[itemprop="legalName"]')
                            .text() || null,
                },
                description:
                    $(
                        $(".description")
                            .html()
                            ?.split('<div class="groupe"')[0]
                            .trim()
                    ).text() || null,
                relations: relations,
                news: {
                    french: $("#fiche_news li")
                        .toArray()
                        .map((e) => {
                            return {
                                name:
                                    $(e)
                                        .find(".sim[href]")
                                        .text()
                                        ?.split(":")
                                        .map((e) => e.trim())
                                        ?.slice(1)
                                        .join(" ") || null,
                                url: $(e).find(".sim[href]")
                                    ? "https://nautiljon.com" +
                                      $(e).find(".sim[href]").attr("href")
                                    : null,
                                date:
                                    $(e)
                                        .find(".sim[href]")
                                        .text()
                                        ?.split(":")[0]
                                        ?.trim() || null,
                                description:
                                    $(e).find(".introNews").text() || null,
                                imageUrl: $(e).find("img")
                                    ? "https://nautiljon.com" +
                                      $(e).find("img").attr("src")
                                    : null,
                            };
                        }),
                },
            };
        }
    },
};
