import { useEffect, useState } from "react";
import { FiSearch } from 'react-icons/fi'
import { NavLink } from "react-router-dom";

function Home() {

    const [animes, setAnimes] = useState([]);

    async function loadAnimes() {
        const response = await fetch("/api/animes/ranking");
        const animes = await response.json();
        setAnimes(animes);
    }

    useEffect(() => {
        loadAnimes();
    }, []);

    return (
        <div id="Home">
            <header id="Home__header">
                <h1 id="Home__header__title">oTaku</h1>
                <h2>Regarder le manga qui vous plaît sans publicités!</h2>
                <NavLink to="/search" className="my-button purple"><FiSearch className="icon" /> Rechercher</NavLink>
            </header>
            <section id="Home__animes">
                {animes.map((item) => {
                    return (
                        // TODO: Export this part to an AnimeLink Component
                        <article key={item.mal_id} className="AnimeCard">
                            <div className="AnimeCard__Picture" style={{ background: `url(${item.medium_picture_url})no-repeat center center/cover` }} />
                            <div className="AnimeCard__Informations">
                                <h3 className="AnimeCard__Informations__title">
                                    {item.en_title}
                                    <span className="japan"></span>
                                </h3>
                                <h4 className="AnimeCard__Informations__title japan">
                                    {item.jp_title}
                                </h4>
                                <h5 className={"AnimeCard__Informations__nsfw --" + item.nsfw_color}>🥵</h5>
                                <ul className="AnimeCard__Informations__categoryList">
                                    {item.genres.slice(0, 3).map((category, i) => <li key={i}>{category}</li>)}
                                </ul>
                                <p>{item.synopsis}</p>
                                <div className="AnimeCard__Informations__icons">
                                    <h5 className="AnimeCard__Informations__icons__rank">
                                        <i className="fas fa-trophy"></i>
                                        # {item.rank}
                                    </h5>
                                    <h5 className="AnimeCard__Informations__icons__mean">
                                        <i className="fas fa-star"></i>
                                        {item.mean} / 10
                                    </h5>
                                    <h5 className="AnimeCard__Informations__icons__num-episodes">
                                        <i className="fas fa-video"></i>
                                        {item.num_episodes} ep.
                                    </h5>
                                    <h5 className="AnimeCard__Informations__icons__rating">
                                        <i className="fas fa-exclamation-circle"></i>
                                        {item.rating}
                                    </h5>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </section>
        </div>
    )
}

export default Home;