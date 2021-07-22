import { Component } from "react";

class Navbar extends Component {
    render() {
        return (
            <div id="Navbar">
                <div className="Navbar__title">
                    <img className="logo" src="/logo.png" alt="Logo" />
                    <h1 className="animate__animated animate__tada">oTaku<br></br><h2>Anime Search Engine</h2></h1>
                </div>
                <div className="Navbar__searchInput">
                    <input type="text" placeholder="One Piece" />
                    <div className="purple-button">Rechercher</div>
                </div>
            </div>
        );
    }
}

export default Navbar;
