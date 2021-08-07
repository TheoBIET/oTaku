const { tokenMiddleware } = require("../middlewares");

test("Middlewares | Check if tokenMiddleware's method exists", async () => {
    expect(tokenMiddleware.authenticateToken).toBeDefined();
});
