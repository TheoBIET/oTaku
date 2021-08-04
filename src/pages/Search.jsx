import { useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom'

function Search() {

    const [results, setResults] = useState([]);

    async function handleSearch(search) {
        if (search.length > 0) {
            const url = `/api/animes/search`;
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
            <input
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
            />
            <button onClick={(e) => handleSearch(e.target.value)}>
                Cliquez ici
            </button>
            {results.map((item) => {
                return (
                    // TODO: Export this part to an AnimeLink Component
                    <div key={item.id} className="AnimeCard">
                        <div className="AnimeCard__Picture" style={{ background: `url(${item.imageUrl})no-repeat center center/cover` }} />
                        <h3>{item.name}</h3>
                        <NavLink to={`/animes/${item.name}?url=${item.url}`}>
                            <button>Lire</button>
                        </NavLink>
                    </div>
                );
            })}
        </div >
    )
}

export default Search;