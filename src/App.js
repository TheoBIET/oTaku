import { Route } from "react-router-dom";
import "./scss/styles.scss";
import SideMenu from "./components/SideMenu";
import Search from "./pages/Search";
import Home from "./pages/Home";
import Anime from "./pages/Anime";
import Player from "./pages/Player";

function App() {
    return (
        <div>
            <SideMenu />
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/streaming" component={Player} />
            <Route path="/animes" component={Anime} exact />
        </div>
    );
}

export default App;
