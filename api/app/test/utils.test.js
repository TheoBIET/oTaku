require("dotenv").config();
const { jwtUtils } = require("../utils");

test("JWT | Access token functions", async () => {
    const accessToken = jwtUtils.generateAccessToken({});
    expect(accessToken).toBeTruthy();

    jwtUtils.verifyAccessToken(accessToken, (err, decoded) => {
        expect(err).toBeFalsy();
        expect(decoded).toBeTruthy();
    });
});

test("JWT | Refresh token functions", async () => {
    const refreshToken = jwtUtils.generateRefreshToken({});
    expect(refreshToken).toBeTruthy();

    jwtUtils.verifyRefreshToken(refreshToken, (err, decoded) => {
        expect(err).toBeFalsy();
        expect(decoded).toBeTruthy();
    });
});
