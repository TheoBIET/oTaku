import { FaEnvelope } from 'react-icons/fa'
import { BsFillPersonFill, BsLockFill } from 'react-icons/bs'
import { connect } from 'react-redux';
import { userSelector } from '../store/userSelectors';
import { loginUserAction } from '../store/userActions';

export function Login({ user }) {
    console.log(user);
    return (
        <div id="Login">
            <form className="Login__form">
                <h2 className="title is-2">Inscrivez-vous</h2>
                <div className="field">
                    <label className="label">Nom d'utilisateur</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="email" placeholder="ex: Kiruuah667" />
                        <span className="icon is-small is-left">
                            <BsFillPersonFill />
                        </span>
                    </p>
                    <label className="label">Email (existant)</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="password" placeholder="ex: kiruuah667@otaku.fr" />
                        <span className="icon is-small is-left">
                            <FaEnvelope />
                        </span>
                    </p>
                    <label className="label">Mot de passe</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="password" placeholder="ex: kiruuah667@otaku.fr" />
                        <span className="icon is-small is-left">
                            <BsLockFill />
                        </span>
                    </p>
                    <label className="label">Confirmer mot de passe</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="password" placeholder="ex: kiruuah667@otaku.fr" />
                        <span className="icon is-small is-left">
                            <BsLockFill />
                        </span>
                    </p>
                </div>
                <div className="my-button">Inscription</div>
            </form>
            <p className="title is-1">OU</p>
            <form className="Login__form">
                <h2 className="title is-2">Connectez-vous</h2>
                <div className="field">
                    <label className="label">Email ou nom d'utilisateur</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="email" placeholder="ex: Kiruuah667" />
                        <span className="icon is-small is-left">
                            <BsFillPersonFill />
                        </span>
                    </p>
                    <label className="label">Email ou nom d'utilisateur</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="password" placeholder="Mot de passe" placeholder="ex: MyStr0ngP455w0Rd" />
                        <span className="icon is-small is-left">
                            <BsLockFill />
                        </span>
                    </p>
                </div>
                <div className="my-button">Connexion</div>
            </form>
        </div>
    )
}

export const LoginStore = connect(
    state => ({
        user: userSelector(state)
    }),
    dispatch => ({
        onLogin: user => dispatch(loginUserAction(user))
    })
)(Login);