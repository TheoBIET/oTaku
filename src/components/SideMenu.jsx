import { NavLink } from 'react-router-dom';
import { FiLogOut, FiUser, FiHome, FiSearch, FiSettings, FiBookmark } from 'react-icons/fi';

function SideMenu() {
    return (
        <div id="SideMenu">
            <NavLink to="/">
                <FiHome className="icon" />
            </NavLink>
            <NavLink to="/search">
                <FiSearch className="icon" />
            </NavLink>
            <NavLink to="/profile">
                <FiUser className="icon" />
            </NavLink>
            <NavLink to="/bookmarks">
                <FiBookmark className="icon" />
            </NavLink>
            <NavLink to="/settings">
                <FiSettings className="icon" />
            </NavLink>
            <NavLink to="/logout">
                <FiLogOut className="icon" />
            </NavLink>
        </div>
    )
}

export default SideMenu;