import { Route } from "react-router-dom";
import "./scss/styles.scss";
import SideMenu from "./components/SideMenu";
import Search from "./pages/Search";
import Home from "./pages/Home";
import Anime from "./pages/Anime";
import Player from "./pages/Player";
import Wait from "./pages/Wait";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
    const [userIsConnected, setUserIsConnected] = useState(false);

    return (
        <div id="App">
            <SideMenu />
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/streaming" component={Player} />
            <Route path="/animes" component={Anime} exact />
            {userIsConnected ? (
                <Route path="/profile" component={Profile} exact />
            ) : (
                <Route path="/profile" component={Login} exact />
            )}
            <Route path="/bookmarks" component={Wait} exact />
            <Route path="/settings" component={Wait} exact />
            <Route path="/logout" component={Wait} exact />
        </div>
    );
}

export default App;
