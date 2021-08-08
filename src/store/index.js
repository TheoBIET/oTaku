import { combineReducers, createStore } from "redux";
import { userReducer } from "./userReducer";

export default createStore(
    combineReducers({
        user: userReducer,
    }),
    // Active Redux dev tools
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
