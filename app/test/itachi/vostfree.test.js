const { vostfree } = require("../../lib/anime");

test('Get search results for "L\'attaque des Titans" on vostfree', async () => {
    const results = await vostfree.getAnimeLinks("L'attaque des Titans");
    expect(results.links.length).toBeGreaterThan(0);
    expect(results.plateform).toBe("vostfree");
});

test('Get streaming links for "L\'attaque des Titans" on vostfree', async () => {
    const results = await vostfree.getStreamingLinks(
        "https://vostfree.tv/465-shingeki-kyojin-chuugakkou-vostfr-ddl-streaming-1fichier-uptobox.html"
    );
    expect(results.length).toBeGreaterThan(0);
});
