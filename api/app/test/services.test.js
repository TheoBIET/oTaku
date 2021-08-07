require("dotenv").config();
const { animeServices } = require("../services");
const mal = require("../lib/mal-ext");

test("animeServices | formatFunction", async () => {
    const anime = await mal.getDetails(23, process.env.MAL_BEARER);
    animeServices.format(anime);
    expect(anime.title).toBe("Ring ni Kakero 1");
});
