const initialState = {
    isAuthenticated: false,
    data: null,
};

export const LOGIN_USER = "LOGIN_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                ...action.payload,
            };
        case UPDATE_USER:
            return {
                ...state,
                ...action.payload,
            };
        case DELETE_USER:
            return {
                ...state,
                ...initialState,
            };
        default:
            return state;
    }
}
