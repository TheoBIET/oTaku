import { Component } from "react";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            most_viewed: null,
            best_rated: null,
            our_selection: null,
            isLoaded: false,
        };
    }

    componentDidMount() {
        this.callApi();
    }

    callApi = async () => {
        const response = await fetch("/api/base");
        const results = await response.json();
        console.log(results);
        this.setState({
            most_viewed: results.most_watched,
            best_rated: results.best_rated,
            our_selection: results.our_selection,
            isLoaded: true,
        });
    };

    // Map on the most_viewed array
    getMostViewed = () => {
        return this.state.most_viewed.map((item) => {
            return (
                <div className="Navigation__row__selection__item">
                    <img
                        src={item.medium_picture_url}
                        alt=""
                        className="Navigation__row__selection__item__background"
                    />
                    <div className="Navigation__row__selection__item__availability">
                        <i class="far fa-frown"></i>
                    </div>
                    <div className="Navigation__row__selection__play">
                        <i class="fas fa-play"></i>
                    </div>
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
                            <li>{item.categories[0].label}</li>
                            <li>{item.categories[1].label}</li>
                            <li>{item.categories[2].label}</li>
                        </ul>
                        <p>{item.synopsis}</p>
                        <div className="item_informations_icons">
                            <h5 className="item_informations_icons__rank">
                                <i class="fas fa-trophy"></i>
                                # {item.rank}
                            </h5>
                            <h5 className="item_informations_icons__mean">
                                <i class="fas fa-star"></i>
                                {item.mean} / 10
                            </h5>
                            <h5 className="item_informations_icons__num-episodes">
                                <i class="fas fa-video"></i>
                                {item.num_episodes} ep.
                            </h5>
                            <h5 className="item_informations_icons__rating">
                                <i class="fas fa-exclamation-circle"></i>
                                {item.rating.label}
                            </h5>
                        </div>
                    </div>
                </div>
            );
        });
    };

    getBestRated = () => {
        return this.state.our_selection.map((item) => {
            return (
                <div className="Navigation__row__selection__item">
                    <img
                        src={item.medium_picture_url}
                        alt=""
                        className="Navigation__row__selection__item__background"
                    />
                    <div className="Navigation__row__selection__item__availability">
                        <i class="far fa-frown"></i>
                    </div>
                    <div className="Navigation__row__selection__play">
                        <i class="fas fa-play"></i>
                    </div>
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
                            <li>{item.categories[0].label}</li>
                            <li>{item.categories[1].label}</li>
                            <li>{item.categories[2].label}</li>
                        </ul>
                        <p>{item.synopsis}</p>
                        <div className="item_informations_icons">
                            <h5 className="item_informations_icons__rank">
                                <i class="fas fa-trophy"></i>
                                # {item.rank}
                            </h5>
                            <h5 className="item_informations_icons__mean">
                                <i class="fas fa-star"></i>
                                {item.mean} / 10
                            </h5>
                            <h5 className="item_informations_icons__num-episodes">
                                <i class="fas fa-video"></i>
                                {item.num_episodes} ep.
                            </h5>
                            <h5 className="item_informations_icons__rating">
                                <i class="fas fa-exclamation-circle"></i>
                                {item.rating.label}
                            </h5>
                        </div>
                    </div>
                </div>
            );
        });
    };

    getOurSelection = () => {
        return this.state.best_rated.map((item) => {
            return (
                <div className="Navigation__row__selection__item">
                    <img
                        src={item.medium_picture_url}
                        alt=""
                        className="Navigation__row__selection__item__background"
                    />
                    <div className="Navigation__row__selection__item__availability">
                        <i class="far fa-frown"></i>
                    </div>
                    <div className="Navigation__row__selection__play">
                        <i class="fas fa-play"></i>
                    </div>
                    <div className="Navigation__row__selection__item__informations">
                        <h3 className="item__informations__title">
                            {item.en_title}
                            <span className="japan"></span>
                        </h3>
                        <h4 className="item__informations__title japan">
                            {item.jp_title}
                        </h4>
                        <h5 className={"item__informations__nsfw --" + item.nsfw_color.label}>🥵</h5>
                        <ul className="item__informations__categoryList">
                            <li>{item.categories[0].label}</li>
                            <li>{item.categories[1].label}</li>
                            <li>{item.categories[2].label}</li>
                        </ul>
                        <p>{item.synopsis}</p>
                        <div className="item_informations_icons">
                            <h5 className="item_informations_icons__rank">
                                <i class="fas fa-trophy"></i>
                                # {item.rank}
                            </h5>
                            <h5 className="item_informations_icons__mean">
                                <i class="fas fa-star"></i>
                                {item.mean} / 10
                            </h5>
                            <h5 className="item_informations_icons__num-episodes">
                                <i class="fas fa-video"></i>
                                {item.num_episodes} ep.
                            </h5>
                            <h5 className="item_informations_icons__rating">
                                <i class="fas fa-exclamation-circle"></i>
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
                {this.state.isLoaded ? (
                    <>
                        <div className="Navigation__row">
                            <h2 className="Navigation__row__title">
                                Les plus regardés{" "}
                                <span className="japan">最も見られた</span>
                            </h2>
                            <div className="Navigation__row__selection">
                                <this.getMostViewed />
                            </div>
                        </div>
                        <div className="Navigation__row">
                            <h2 className="Navigation__row__title">
                                Les mieux notés{" "}
                                <span className="japan">トップレート</span>
                            </h2>
                            <div className="Navigation__row__selection">
                                <this.getOurSelection />
                            </div>
                        </div>
                        <div className="Navigation__row">
                            <h2 className="Navigation__row__title">
                                Notre sélection{" "}
                                <span className="japan">セレクション</span>
                            </h2>
                            <div className="Navigation__row__selection">
                                <this.getBestRated />
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        );
    }
}

export default Navigation;
