import { useState } from "react";
import axios from "axios";
import { FiSearch } from 'react-icons/fi'
import { NavLink } from "react-router-dom";

function Search() {

    const [results, setResults] = useState([]);

    async function handleSearch(search) {
        if (search.length > 0) {
            const url = `http://localhost:4000/api/animes/search`;
            const data = {
                name: search,
            };

            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setResults(response.data);
        }
    }

    return (
        <div id="Search">
            <form id="Search-Form" onSubmit={(e) => handleSearch(e.target.value)}>
                <input
                    type="text"
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Rechercher un anime..."
                />
                <div onClick={(e) => handleSearch(e.target.value)}>
                    <FiSearch className="icon" />
                </div>
            </form>
            <div id="Search__Results">
                {results.map((item) => {
                    return (
                        // TODO: Export this part to an AnimeLink Component
                        <div key={item.mal_id} className="AnimeCard">
                            <NavLink to={`/animes/${item.mal_id}/about`}>
                                <div className="AnimeCard__Picture" style={{ background: `url(${item.medium_picture_url})no-repeat center center/cover` }} />
                            </NavLink>
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
                        </div>
                    );
                })}
            </div>
        </div >
    )
}

export default Search;