// New react App class extend component
import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      animeName: 'My Hero Academia',
      isLoading: false,
      isErrored: false,
      result: null
    };
  }

  componentDidMount = () => {
    this.onSubmit();
  }

  onChange = (e) => {
    this.setState({
      animeName: e.target.value
    });
  }

  onSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    this.setState({ result: null, isLoading: true, forStreaming: false });

    const { animeName } = this.state;

    const results = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        name: animeName
      })
    });

    if (results.status !== 200) {
      return this.setState({ isErrored: true });
    }

    this.onSubmit();

    const { data } = await results.json();
    this.setState({ animeName: '', result: data });
  }


  getResultsList = () => {
    const results = this.state.result;
    return results.map((anime) => {
      return (
        <li key={anime.id} onClick={anime.episodes.length > 0 ? this.changeView : this.getStreamingLink} data-mal-id={anime.mal_id}>
          <img src={anime.medium_picture_url} alt={anime.en_title} className="anime__picture" />
          <h3 className="anime__title">{anime.en_title}</h3>
          <h4 className="anime__ja-title">{anime.ja_title}</h4>
          {anime.episodes.length > 0 ?
            <div className="anime__availability --true"></div> :
            <div className="anime__availability --false"></div>
          }
        </li>
      );
    });
  }

  changeView = (e) => {
    const malID = e.target.closest('li').dataset.malId;
    this.setState({ forStreaming: !this.state.forStreaming, currentSelectMAL: malID });
  }

  getAnimeInformations = (e) => {
    const foundAnime = this.state.result.find((anime) => anime.mal_id === parseInt(this.state.currentSelectMAL, 10));

    console.log(foundAnime);

    return (
      <div id="animeInformations" key={foundAnime.id} className="anime__information">
        <div>
          <h3 className="anime__title">{foundAnime.en_title}</h3>
          <h4 className="anime__ja-title">{foundAnime.jp_title}</h4>
          <img src={foundAnime.medium_picture_url} alt={foundAnime.en_title} />
          <div className="anime__information__description">{foundAnime.synopsis}</div>
          <div className="anime__information__genres">
            {foundAnime.categories.map((category) => {
              return (
                <span key={category.id}>
                  {category.label}
                </span>
              );
            })}
          </div>
        </div>
        <div>
          <div className="anime__information__episodes">
            {/* Sort foundAnime by playlist_no and episode_num */}
            {foundAnime.episodes.sort((a, b) => {
              if (a.playlist_no < b.playlist_no) {
                return -1;
              } else if (a.playlist_no > b.playlist_no) {
                return 1;
              } else {
                if (a.episode_num < b.episode_num) {
                  return -1;
                } else if (a.episode_num > b.episode_num) {
                  return 1;
                } else {
                  return 0;
                }
              }
            }).map((episode) => {
              return (
                <a className="anime__information__episodes__item" href={episode.streaming_link} key={episode.id}>
                  Épisode n°{episode.episode_num}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  getStreamingLink = async (e) => {
    const malID = e.target.closest('li').dataset.malId;

    this.setState({ isLoading: true, forStreaming: true, currentSelectMAL: malID });

    const results = await fetch(`/api/streaming/${malID}`);

    if (results.status !== 200) {
      return this.setState({ isErrored: true, isLoading: false });
    }

    console.log(results);

    const data = await results.json();
    console.log(data);
    this.setState({ result: data, isLoading: false });
  }

  render() {
    return (
      <div className="App">
        <nav>
          <h1>o'Taku</h1>
          <form>
            <input type="text" value={this.state.animeName} onChange={this.onChange} />
            <button onClick={this.onSubmit} type="submit">Rechercher</button>
          </form>
        </nav>
        <main>
          {
            this.state.isLoading ?
              <div id="resultsBox">
                {this.state.result ? <ul> {this.state.forStreaming ? <this.getAnimeInformations /> : <this.getResultsList />} </ul> :
                  <div id="is-loading">
                    <svg width="130" height="130" viewBox="0 0 57 57" xmlns="http://www.w3.org/2000/svg" stroke="#000">
                      <g fill="none" fill-rule="evenodd">
                        <g transform="translate(1 1)" stroke-width="2">
                          <circle cx="5" cy="50" r="5">
                            <animate attributeName="cy"
                              begin="0s" dur="2.2s"
                              values="50;5;50;50"
                              calcMode="linear"
                              repeatCount="indefinite" />
                            <animate attributeName="cx"
                              begin="0s" dur="2.2s"
                              values="5;27;49;5"
                              calcMode="linear"
                              repeatCount="indefinite" />
                          </circle>
                          <circle cx="27" cy="5" r="5">
                            <animate attributeName="cy"
                              begin="0s" dur="2.2s"
                              from="5" to="5"
                              values="5;50;50;5"
                              calcMode="linear"
                              repeatCount="indefinite" />
                            <animate attributeName="cx"
                              begin="0s" dur="2.2s"
                              from="27" to="27"
                              values="27;49;5;27"
                              calcMode="linear"
                              repeatCount="indefinite" />
                          </circle>
                          <circle cx="49" cy="50" r="5">
                            <animate attributeName="cy"
                              begin="0s" dur="2.2s"
                              values="50;50;5;50"
                              calcMode="linear"
                              repeatCount="indefinite" />
                            <animate attributeName="cx"
                              from="49" to="49"
                              begin="0s" dur="2.2s"
                              values="49;5;27;49"
                              calcMode="linear"
                              repeatCount="indefinite" />
                          </circle>
                        </g>
                      </g>
                    </svg>
                  </div>}
              </div>
              :
              null
          }
        </main>
      </div>
    );
  }
}

export default App;