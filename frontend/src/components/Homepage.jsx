import { Component } from "react";
import AnimeLoader from "./AnimeLoader";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            most_viewed: null,
            best_rated: null,
            our_selection: null,
            isLoading: this.props.loadingState,
        };
    }

    componentDidMount() {
        this.callApi();
    }

    callApi = async () => {
        const response = await fetch(`/api/base`);
        const results = await response.json();
        this.setState({
            most_viewed: results.most_watched,
            best_rated: results.best_rated,
            our_selection: results.our_selection,
            isLoading: false,
        });

        this.props.onLoadComplete();
    };

    sendAnimeID = (e) => {
        const animeID = e.target
            .closest(".Navigation__row__selection__item")
            .getAttribute("data-mal-id");

        const episodes = e.target
            .closest(".Navigation__row__selection__item")
            .getAttribute("data-episodes");

        this.props.onAnimeClick(animeID, episodes);
    };

    getCategoryList = (props) => {
        return props.props.slice(0, 3).map(category => <li key={category.id}>{category.label}</li>);
    };

    getMoviesRow = (props) => {
        return props.props.map((item) => {
            return (
                <div
                    className="Navigation__row__selection__item"
                    key={item.mal_id}
                    data-mal-id={item.mal_id}
                    data-episodes={!!item.episodes.length}
                >
                    {parseInt(this.props.animeID, 10) === item.mal_id &&
                        this.props.animeIsLoading ? (
                        <>
                            <img
                                src={item.medium_picture_url}
                                alt={item.en_title}
                                className="Navigation__row__selection__item__background loading"
                                onClick={this.sendAnimeID}
                            />
                            {item.episodes.length > 0 ? (
                                <div className="Navigation__row__selection__item__availability loading">
                                    👍
                                </div>
                            ) : (
                                <div className="Navigation__row__selection__item__availability loading">
                                    👎
                                </div>
                            )}
                            <div className="Navigation__row__selection__status">
                                <AnimeLoader />
                            </div>
                        </>
                    ) : (
                        <>
                            <img
                                src={item.medium_picture_url}
                                alt={item.en_title}
                                className="Navigation__row__selection__item__background"
                                onClick={this.sendAnimeID}
                            />
                            {item.episodes.length > 0 ? (
                                <div className="Navigation__row__selection__item__availability">
                                    👍
                                </div>
                            ) : (
                                <div className="Navigation__row__selection__item__availability">
                                    👎
                                </div>
                            )}
                            <div className="Navigation__row__selection__status --play">
                                <i className="fas fa-play"></i>
                            </div>
                        </>
                    )}
                    <div className="Navigation__row__selection__item__informations">
                        <h3 className="item__informations__title">
                            {item.en_title}
                            <span className="japan"></span>
                        </h3>
                        <h4 className="item__informations__title japan">
                            {item.jp_title}
                        </h4>
                        <h5 className="item__informations__nsfw --white">🥵</h5>
                        <ul className="item__informations__categoryList">
                            <this.getCategoryList props={item.categories} />
                        </ul>
                        <p>{item.synopsis}</p>
                        <div className="item_informations_icons">
                            <h5 className="item_informations_icons__rank">
                                <i className="fas fa-trophy"></i>
                                # {item.rank}
                            </h5>
                            <h5 className="item_informations_icons__mean">
                                <i className="fas fa-star"></i>
                                {item.mean} / 10
                            </h5>
                            <h5 className="item_informations_icons__num-episodes">
                                <i className="fas fa-video"></i>
                                {item.num_episodes} ep.
                            </h5>
                            <h5 className="item_informations_icons__rating">
                                <i className="fas fa-exclamation-circle"></i>
                                {item.rating.label}
                            </h5>
                        </div>
                    </div>
                </div>
            );
        });
    };

    render() {
        return (
            <div id="Navigation">
                {!this.state.isLoading && (
                    <>
                        <div className="Navigation__row">
                            <h2 className="Navigation__row__title">
                                Les plus regardés{" "}
                                <span className="japan">最も見られた</span>
                            </h2>
                            <div className="Navigation__row__selection">
                                <this.getMoviesRow
                                    props={this.state.most_viewed}
                                />
                            </div>
                        </div>
                        <div className="Navigation__row">
                            <h2 className="Navigation__row__title">
                                Les mieux notés{" "}
                                <span className="japan">トップレート</span>
                            </h2>
                            <div className="Navigation__row__selection">
                                <this.getMoviesRow
                                    props={this.state.best_rated}
                                />
                            </div>
                        </div>
                        <div className="Navigation__row">
                            <h2 className="Navigation__row__title">
                                Notre sélection{" "}
                                <span className="japan">セレクション</span>
                            </h2>
                            <div className="Navigation__row__selection">
                                <this.getMoviesRow
                                    props={this.state.our_selection}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default Homepage;
