import { Component } from "react";

class Anime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animeID: this.props.animeID,
            isLoading: this.props.loadingState,
            animeInformations: this.props.animeInformations,
            selectedEpisodeURL: this.props.animeInformations.episodes[0].streaming_link,
        };
    }

    changeEpisode = (event) => {
        this.setState({
            selectedEpisodeURL: event.target.value,
        });
    };

    render() {
        return (
            <div className="Anime">
                <div className="Anime__left">
                    <div className="Anime__left__title">
                        <h2>{this.state.animeInformations.en_title}</h2>
                        <h3>{this.state.animeInformations.jp_title}</h3>
                    </div>

                    <div className="Anime__left__poster">
                        <img
                            src={this.state.animeInformations.large_picture_url}
                            alt=""
                        />
                    </div>

                    <div className="Anime__left__info">
                        <div className="Anime__left__info__item">
                            {this.state.animeInformations.rating.label.toUpperCase()}
                        </div>
                        <div className="Anime__left__info__item">
                            {this.state.animeInformations.media_type.label.toUpperCase()}
                        </div>
                        <div className="Anime__left__info__item">
                            {this.state.animeInformations.source.label.toUpperCase()}
                        </div>
                        <div className="Anime__left__info__item">
                            MaL ID : {this.state.animeInformations.mal_id}
                        </div>
                        <div className="Anime__left__info__item">
                            Rang : # {this.state.animeInformations.rank}
                        </div>
                        <div className="Anime__left__info__item">
                            Note : {this.state.animeInformations.mean}
                        </div>
                    </div>
                </div>
                <div className="Anime__right">
                    <div className="Anime__right__synopsis">
                        <h3>Synopsis</h3>
                        {this.state.animeInformations.synopsis}
                    </div>
                    <div className="Anime__right__select">
                        <h4>Choississez une collection : </h4>
                        <select name="" id="" onChange={this.changeEpisode}>
                            {this.state.animeInformations.episodes.map(
                                (episode, index) => (
                                    <option
                                        value={episode.streaming_link}
                                        key={index}
                                    >
                                        Collection {episode.episode_num}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                    <div className="Anime__right__select">
                        <h4>Choississez un épisode : </h4>
                        <select name="" id="" onChange={this.changeEpisode}>
                            {this.state.animeInformations.episodes.map(
                                (episode, index) => (
                                    <option
                                        value={episode.streaming_link}
                                        key={index}
                                    >
                                        Épisode {episode.episode_num}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                    <div className="Anime__right__video">
                        <iframe
                            src={this.state.selectedEpisodeURL}
                            title={this.props.en_title}
                            allowFullScreen
                            width="70%"
                            height="90%"
                        ></iframe>
                    </div>
                </div>
            </div>
        );
    }
}

export default Anime;
