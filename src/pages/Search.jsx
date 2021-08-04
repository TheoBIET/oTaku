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
                    <>
                        <hr></hr>
                        <div key={item.id}>
                            <h3>{item.name}</h3>
                            <img src={item.imageUrl} alt="" width='100px' />
                            <NavLink to={`/animes/${item.name}?url=${item.url}`}>
                                <button>Lire</button>
                            </NavLink>
                        </div>
                        <hr></hr>
                    </>
                );
            })}
        </div>
    )
}

export default Search;