require("dotenv").config();
const {
    animeController,
    tokenController,
    userController,
} = require("../controllers");

test("Controllers | Check if animeController's method exists", async () => {
    expect(animeController.search).toBeDefined();
    expect(animeController.informations).toBeDefined();
    expect(animeController.getRanking).toBeDefined();
    expect(animeController.websites).toBeDefined();
    expect(animeController.streaming).toBeDefined();
});

test("Controllers | Check if tokenController's method exists", async () => {
    expect(tokenController.refreshToken).toBeDefined();
});

test("Controllers | Check if userController's method exists", async () => {
    expect(userController.getProfile).toBeDefined();
    expect(userController.login).toBeDefined();
    expect(userController.createAccount).toBeDefined();
    expect(userController.updateInformations).toBeDefined();
    expect(userController.updatePassword).toBeDefined();
    expect(userController.deleteAccount).toBeDefined();
});
