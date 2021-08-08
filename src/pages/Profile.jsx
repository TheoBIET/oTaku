import { LoginStore } from './Login'
import { connect } from 'react-redux';
import { userSelector } from '../store/userSelectors';
import { loginUserAction } from '../store/userActions';

export function Profile({ user }) {
    console.log(user)
    return (
        <div id="Login">
            {user.isAuthenticated ? <div>Loading...</div> : <LoginStore />}
        </div>
    )
}

export const ProfileStore = connect(
    state => ({
        user: userSelector(state)
    }),
    dispatch => ({
        onLogin: data => dispatch(loginUserAction(data))
    })
)(Profile);