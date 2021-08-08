import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Route } from "react-router-dom";

export function Anime(props) {
    const [anime, setAnime] = useState({});
    const [websites, setWebsites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [links, setLinks] = useState([]);
    const [episodeLink, setEpisodeLink] = useState(null);

    useEffect(function () {
        async function fetchInformations() {
            const url = `http://localhost:4000/api/animes/${props.match.params.id}/informations`;
            const response = await axios.get(url);
            console.log(response.data);
            setAnime(response.data);
            setLoading(false);
            fetchWebsites(response.data.en_title);
        }

        async function fetchWebsites(name) {
            console.log("name", name);
            const url = `/api/animes/websites`;
            const data = {
                name,
            };

            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(response.data);
            setWebsites(response.data);
        }

        fetchInformations();
    }, []);

    async function fetchStreamingLinks(plateform, url) {
        const urlAPI = `/api/animes/streaming`;
        const data = {
            plateform,
            url,
        };

        const response = await axios.post(urlAPI, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(response.data);
        setLinks(response.data);
        setEpisodeLink(response.data[0].link);
    }

    function handleSelect(e) {
        console.log(e.target.value);
        setEpisodeLink(e.target.value);
    }

    return (
        <div className="Anime">
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                    <div className="Anime__left">
                        <div className="Anime__left__title">
                            <h2>{anime.en_title}</h2>
                            <h3>{anime.jp_title}</h3>
                        </div>

                        <div className="Anime__left__poster">
                            <img src={anime.large_picture_url} alt="" />
                        </div>

                        <div className="Anime__left__info">
                            <div className="Anime__left__info__item">
                                {anime.rating.toUpperCase()}
                            </div>
                            <div className="Anime__left__info__item">
                                {anime.media_type.toUpperCase()}
                            </div>
                            <div className="Anime__left__info__item">
                                {anime.source}
                            </div>
                            <div className="Anime__left__info__item">
                                MaL ID : {anime.mal_id}
                            </div>
                            <div className="Anime__left__info__item">
                                Rang : # {anime.rank}
                            </div>
                            <div className="Anime__left__info__item">
                                Note : {anime.mean}
                            </div>
                        </div>
                    </div>
                    <div className="Anime__right">
                        <div className="Anime__right__synopsis">
                            <h3>Synopsis</h3>
                            {anime.synopsis}
                        </div>
                        <Route path="/animes/:id/about" exact>
                            <div className="Anime__right__content">
                                <h3>Liens disponibles</h3>
                                <div className="Anime__right__list">
                                    {websites?.map((website) => (
                                        <div className="Anime__right__item">
                                            <h4 className="title is-4">
                                                {website.plateform.toUpperCase()}
                                            </h4>
                                            {website.links.map((link, i) => (
                                                <NavLink
                                                    key={i}
                                                    to={`/animes/${anime.mal_id}/streaming`}
                                                    className="Anime__right__item__link"
                                                    onClick={() =>
                                                        fetchStreamingLinks(
                                                            website.plateform,
                                                            link.url
                                                        )
                                                    }
                                                >
                                                    <h5>{link.title}</h5>
                                                    <p>{link.language}</p>
                                                </NavLink>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Route>
                        <Route path="/animes/:id/streaming">
                            <div className="Anime__right__content">
                                <h3>Streaming <select
                                    name="selectLink"
                                    id=""
                                    onChange={handleSelect}
                                    value={episodeLink}
                                >
                                    {links.map((link, i) => (
                                        <option key={i} value={link.link}>
                                            {link.title}
                                        </option>
                                    ))}
                                </select></h3>
                                <div className="Anime__right__video">

                                    <div className="wrapper">
                                        <iframe
                                            src={episodeLink}
                                            title={anime.en_title}
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </Route>
                    </div>
                </>
            )}
        </div>
    );
}
