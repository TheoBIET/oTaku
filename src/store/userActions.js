export const loginUserAction = (user) => ({
    type: "LOGIN_USER",
    payload: {
        isAuthenticated: true,
        user,
    },
});
