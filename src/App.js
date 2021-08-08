import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./scss/styles.scss";

// Components
import Search from "./pages/Search";
import Home from "./pages/Home";
import Wait from "./pages/Wait";

import { ProfileStore } from "./pages/Profile";
import { SideMenuStore } from "./components/SideMenu";
import { Anime } from "./pages/Anime";

function App() {
    return (
        <Provider store={store}>
            <div id="App">
                <SideMenuStore />
                <Route exact path="/" component={Home} />
                <Route path="/search" component={Search} />
                <Route path="/animes/:id" component={Anime} />
                <Route path="/profile" component={ProfileStore} exact />
                <Route path="/bookmarks" component={Wait} exact />
                <Route path="/settings" component={Wait} exact />
                <Route path="/logout" component={Wait} exact />
            </div>
        </Provider>
    );
}

export default App;
