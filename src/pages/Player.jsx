import { useEffect, useState } from "react";
import axios from "axios";

function Anime() {

    const [links, setLinks] = useState([]);

    useEffect(function () {
        async function fetchInformations() {
            const url = `/api/animes/streaming`;
            const data = {
                plateform: "vostfree",
                url: 'https://vostfree.tv/265-one-piece-985-vostfr-anime.html',
            };

            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(response)

            setLinks(response.data);
        }

        fetchInformations();
    }, []);

    return (
        <div id="Anime">
            {links.length > 0 ? links.map((link) => (
                <div>
                    <h1>{link.title}</h1>
                </div>
            )) : <h1>Chargement</h1>}
        </div >
    )
}

export default Anime;