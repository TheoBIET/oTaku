import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Anime() {

    const [anime, setAnime] = useState({});
    const [websites, setWebsites] = useState([]);

    useEffect(function () {
        async function fetchInformations() {
            const url = `/api/animes/informations`;
            const data = {
                url: 'https://nautiljon.com/animes/one+piece.html',
            };

            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setAnime(response.data);
        }

        async function fetchWebsites() {
            const url = `/api/animes/websites`;
            const data = {
                name: "One Piece",
            };

            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setWebsites(response.data);
        }

        fetchInformations();
        fetchWebsites();
    }, []);

    return (
        <div id="Anime">
            {anime.genres?.length > 0 &&
                <div>
                    <h1>{anime.name}</h1>
                    <h1>{anime.japName}</h1>
                    <img src={anime.imageUrl} alt={anime.name} />
                    <p>{anime.description}</p>
                    <ul>
                        {anime.genres.map(genre => (
                            <li key={genre}>{genre}</li>
                        ))}
                    </ul>
                    <ul>
                        {anime.vodPlatform.map(genre => (
                            <li key={genre}>{genre}</li>
                        ))}
                    </ul>
                    <iframe src={anime.trailer} title={anime.name} width="560" height="315" frameBorder="0" allowFullScreen></iframe>
                    <ul>
                        {websites.length > 0 && websites.map((website, i) => {
                            return (
                                <li key={website.plateform}>{website.plateform} ({website.language})
                                    <ul>
                                        {website.links.map(link => (
                                            <li key={link.url}>{link.title} ({link.language})
                                                <NavLink to={`/streaming?plateform=${website.plateform}&url=${link.url}`} >
                                                    <button>Go</button>
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
        </div >
    )
}

export default Anime;