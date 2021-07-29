import { Component } from "react";

import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Loader from "./Loader";
// import Footer from './Footer';
// import Contribute from './Contribute';
import Anime from "./Anime";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            onHomePage: true,
            onAnimePage: false,
            animeID: null,
            animeIsLoading: false,
            animeInformations: null
        };
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    loadComplete = () => {
        this.setState({
            isLoading: false,
        });
    };

    onSearch = () => {
        this.setState({
            onHomePage: false,
            onAnimePage: false,
        });
    };

    onHomepageClick = () => {
        this.setState({
            onHomePage: true,
            onAnimePage: false,
        });
    };

    onAnimeClick = async (animeID) => {
        this.setState({ animeID: animeID, animeIsLoading: true });
        await this.getStreamingLink(animeID);
        this.setState({
            onHomePage: false,
            onAnimePage: true,
        });
    };

    getStreamingLink = async (animeID) => {
        const response = await fetch(`http://localhost:3003/api/streaming/${animeID}`);
        const results = await response.json(animeID);
        this.setState({ animeID: animeID, animeIsLoading: false, animeInformations: results });
        console.log(results);
    };

    render() {
        return (
            <div id="App">
                <Navbar
                    onSearch={this.onSearch}
                    onHomepageClick={this.onHomepageClick}
                />
                {this.state.onHomePage && (
                    <Homepage
                        onLoadComplete={this.loadComplete}
                        loadingState={this.state.isLoading}
                        onAnimeClick={this.onAnimeClick}
                        animeID={this.state.animeID}
                        animeIsLoading={this.state.animeIsLoading}
                    />
                )}
                {this.state.onAnimePage && (
                    <Anime
                        onLoadComplete={this.loadComplete}
                        loadingState={this.state.isLoading}
                        animeID={this.state.animeID}
                        animeInformations={this.state.animeInformations}
                    />
                )}
                {this.state.isLoading && <Loader />}
                {/* <Contribute />
        <Footer /> */}
            </div>
        );
    }
}

export default App;
