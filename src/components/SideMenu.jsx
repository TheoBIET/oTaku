import { NavLink } from 'react-router-dom'

function SideMenu() {
    return (
        <div id="SideMenu">
            <NavLink to="/">
                Home
            </NavLink>
            <NavLink to="/search">
                Search
            </NavLink>
        </div>
    )
}

export default SideMenu;