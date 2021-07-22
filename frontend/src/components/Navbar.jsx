import { Component } from "react";

class Navbar extends Component {
    render() {
        return (
            <div id="Navbar">
                <div className="Navbar__title">
                    <h1 className="animate__animated animate__tada">oTaku</h1>
                </div>
                <div className="Navbar__searchInput">
                    <input type="text" placeholder="One Piece" />
                    <div className="search-button">Rechercher</div>
                </div>
            </div>
        );
    }
}

export default Navbar;
