import { LoginStore } from "./Login";
import { connect } from "react-redux";
import { userSelector } from "../store/userSelectors";
import { loginUserAction } from "../store/userActions";

export function Profile({ user }) {
    if (!user.isAuthenticated) {
        return <LoginStore />
    } else {
        return (
            <div id="Profile">
                <header id="Profile__header">
                    <img src={user.data.avatar_url ?? "https://cdn.discordapp.com/attachments/685246279495712889/873976146281254942/img_avatar1.png"} alt="" className="Profile__header__avatar" >
                    </img>
                    <h3 className="title is-1">{user.data.username}</h3>
                </header>
                <div id="Profile__body">
                    <p id="Profile__about__bio">{user.data.description ?? "Aucune bigraphie renseignée"}</p>
                    <p><strong>Prénom: </strong>{user.data.first_name ?? "Inconnu"}</p>
                    <p><strong>Nom: </strong>{user.data.last_name ?? "Inconnu"}</p>
                    <p><strong>My Anime List: </strong>{user.data.my_anime_list_username ?? "Inconnu"}</p>
                    <p><strong>Email: </strong>{user.data.email}</p>
                </div>
            </div >
        )
    }
}

export const ProfileStore = connect(
    (state) => ({
        user: userSelector(state),
    }),
    (dispatch) => ({
        onLogin: (data) => dispatch(loginUserAction(data)),
    })
)(Profile);
