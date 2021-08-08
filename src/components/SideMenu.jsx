import { NavLink } from 'react-router-dom';
import { FiLogOut, FiUser, FiHome, FiSearch, FiSettings, FiBookmark } from 'react-icons/fi';
import { userSelector } from '../store/userSelectors';
import { connect } from 'react-redux';
import { logoutUserAction } from '../store/userActions';

export function SideMenu({ user, onLogout }) {
    return (
        <nav id="SideMenu">
            <NavLink to="/">
                <FiHome className="icon" />
            </NavLink>
            <NavLink to="/search">
                <FiSearch className="icon" />
            </NavLink>
            <NavLink to="/profile">
                <FiUser className="icon" />
            </NavLink>
            {user.isAuthenticated ?
                <NavLink to="/bookmarks">
                    <FiBookmark className="icon" />
                </NavLink> : null}
            <NavLink to="/settings">
                <FiSettings className="icon" />
            </NavLink>
            {user.isAuthenticated ?
                <NavLink to="/profile" onClick={onLogout}>
                    <FiLogOut className="icon" />
                </NavLink> : null}
        </nav>
    )
}

export const SideMenuStore = connect(
    state => ({
        user: userSelector(state)
    }),
    dispatch => ({
        onLogout: () => dispatch(logoutUserAction())
    })
)(SideMenu);