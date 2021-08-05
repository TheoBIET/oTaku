const itachi = require("../../lib");

test('Search "L\'attaque des Titans" on all availables websites', async () => {
    const results = await itachi.getAnimes("L'attaque des Titans");
    expect(results.length).toBeGreaterThan(0);
});

test('Fetch streaming links from "https://vostfree.tv/465-shingeki-kyojin-chuugakkou-vostfr-ddl-streaming-1fichier-uptobox.html"', async () => {
    const results = await itachi.getStreaming(
        "vostfree",
        "https://vostfree.tv/465-shingeki-kyojin-chuugakkou-vostfr-ddl-streaming-1fichier-uptobox.html"
    );
    expect(results.length).toBeGreaterThan(0);
});
