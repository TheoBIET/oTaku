export const loginUserAction = (data) => ({
    type: "LOGIN_USER",
    payload: {
        isAuthenticated: true,
        data,
    },
});

export const logoutUserAction = () => ({
    type: "LOGOUT_USER",
    payload: {
        isAuthenticated: false,
        data: null,
    },
});
