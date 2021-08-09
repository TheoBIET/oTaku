import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Route } from "react-router-dom";

import { Loader } from "../components/Loader";

export function Anime(props) {
    const [anime, setAnime] = useState({});
    const [websites, setWebsites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scrapIsLoading, setScrapIsLoading] = useState(false);
    const [links, setLinks] = useState([]);
    const [episodeLink, setEpisodeLink] = useState(null);
    const [isAlreadySearching, setIsAlreadySearching] = useState(false);

    useEffect(function () {
        if (!anime.en_title) {
            async function fetchInformations() {
                const url = `http://localhost:4000/api/animes/${props.match.params.id}/informations`;
                const response = await axios.get(url);
                setAnime(response.data);
                setLoading(false);
            }

            fetchInformations();
        }

        if (!websites.length && !isAlreadySearching && anime.en_title) {
            async function fetchWebsites(name) {
                setScrapIsLoading(true);
                const url = `/api/animes/websites`;
                const data = {
                    name,
                };

                const response = await axios.post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                setWebsites(response.data);

                if (response.data.length === 0) {
                    setIsAlreadySearching(true);
                }

                setScrapIsLoading(false);
            }

            fetchWebsites(anime.en_title);
        }
    });

    async function fetchStreamingLinks(plateform, url) {
        setScrapIsLoading(true);
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

        setLinks(response.data);
        setEpisodeLink(response.data[0].link);
        setScrapIsLoading(false);
    }

    function handleSelect(e) {
        setEpisodeLink(e.target.value);
    }

    // TODO: Clean this, and maybe make a component for website list and player?? After configure Redux for that
    return (
        <div className="Anime">
            {loading ? (
                <Loader />
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
                                MaL ID :<br /> {anime.mal_id}
                            </div>
                            <div className="Anime__left__info__item">
                                Rang :<br /> # {anime.rank}
                            </div>
                            <div className="Anime__left__info__item">
                                Note :<br /> {anime.mean}
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
                                    {scrapIsLoading ? (
                                        <Loader />
                                    ) : (
                                        websites.length === 0 ? (
                                            <div className="Anime__right__item">
                                                <div className="Anime__right__item__link title is-4">
                                                    Aucun lien trouvé!<br />
                                                    Essaie avec un autre anime de la même saga!
                                                </div>
                                            </div>
                                        ) : (
                                            websites?.map((website, i) => (
                                                <div
                                                    key={i}
                                                    className="Anime__right__item"
                                                >
                                                    <h4 className="title is-4">
                                                        {website.plateform.toUpperCase()}
                                                    </h4>
                                                    {website.links.map(
                                                        (link, i) => (
                                                            <NavLink
                                                                key={i}
                                                                to={`/animes/${anime.mal_id}/streaming`}
                                                                className="Anime__right__item__link"
                                                                onClick={() => {
                                                                    setLinks([]);
                                                                    fetchStreamingLinks(
                                                                        website.plateform,
                                                                        link.url
                                                                    );
                                                                }}
                                                            >
                                                                <h5>
                                                                    {link.title}
                                                                </h5>
                                                                <p>
                                                                    {link.language}
                                                                </p>
                                                            </NavLink>
                                                        )
                                                    )}
                                                </div>
                                            ))
                                        )
                                    )}
                                </div>
                            </div>
                        </Route>
                        <Route path="/animes/:id/streaming">
                            <div className="Anime__right__content">
                                {scrapIsLoading ? (
                                    <>
                                        <h3>Streaming</h3>
                                        <Loader />
                                    </>
                                ) : (
                                    <>
                                        <h3>
                                            Streaming{" "}
                                            <select
                                                name="selectLink"
                                                id=""
                                                onChange={handleSelect}
                                                value={episodeLink}
                                            >
                                                {links.length > 0 ? (
                                                    links.map((link, i) => (
                                                        <option
                                                            key={i}
                                                            value={link.link}
                                                        >
                                                            {link.title}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option
                                                        value="">
                                                        ❌
                                                    </option>
                                                )}
                                            </select>
                                        </h3>{links.length > 0 ? (
                                            <div className="Anime__right__video">
                                                <div className="wrapper">
                                                    <iframe
                                                        src={episodeLink}
                                                        title={anime.en_title}
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="Anime__right__video">
                                                <span>Une erreur s'est produite, réessayez</span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </Route>
                    </div>
                </>
            )}
        </div>
    );
}
