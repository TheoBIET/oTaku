import { useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

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
            <form id="Search-Form" onSubmit={(e) => handleSearch(e.target.value)}>
                <input
                    type="text"
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <div onClick={(e) => handleSearch(e.target.value)}>
                    <FiSearch class="icon" />
                </div>
            </form>
            <div id="Search__Results">
                {results.map((item) => {
                    return (
                        // TODO: Export this part to an AnimeLink Component
                        <div key={item.id} className="AnimeCard">
                            <div className="AnimeCard__Picture" style={{ background: `url(${item.medium_picture_url})no-repeat center center/cover` }} />
                            <div className="AnimeCard__Informations">
                                <div className="Informations__Title">{item.name}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div >
    )
}

export default Search;