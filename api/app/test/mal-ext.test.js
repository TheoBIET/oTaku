require("dotenv").config();
const mal = require("../lib/mal-ext");

test("mal-ext | search", async () => {
    const animeList = await mal.search("One Piece", process.env.MAL_BEARER);
    expect(animeList.length).toBeGreaterThan(0);
});

test("mal-ext | get details", async () => {
    const anime = await mal.getDetails(23, process.env.MAL_BEARER);
    expect(anime.title).toBe("Ring ni Kakero 1");
});

test("mal-ext | get ranking", async () => {
    const animeList = await mal.getRanking(process.env.MAL_BEARER);
    expect(animeList.length).toBeGreaterThan(0);
});
