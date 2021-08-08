import { FaEnvelope } from 'react-icons/fa'
import { BsFillPersonFill, BsLockFill } from 'react-icons/bs'
import { connect } from 'react-redux';
import { userSelector } from '../store/userSelectors';
import { loginUserAction } from '../store/userActions';
import { useState } from 'react';

import axios from 'axios';

export function Login({ user, onLogin }) {
    console.log(user);
    console.log(onLogin);

    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    const [usernameSignup, setUsernameSignup] = useState('');
    const [emailSignup, setEmailSignup] = useState('');
    const [passwordSignup, setPasswordSignup] = useState('');
    const [passwordSignupConfirm, setPasswordSignupConfirm] = useState('');

    const [userLoginIsErrored, setUserLoginIsErrored] = useState(false);
    const [passwordLoginIsErrored, setPasswordLoginIsErrored] = useState(false);

    async function handleLogin() {
        try {
            const url = `http://localhost:4000/api/user/login`;

            const payload = {
                login: usernameLogin,
                password: passwordLogin
            }

            const response = await axios.post(url, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setUserLoginIsErrored(false);
            setPasswordLoginIsErrored(false);

            onLogin(response.data);

        } catch (error) {
            if (error.response.status === 401 && error.response.data.login) {
                setPasswordLogin('');
                return setPasswordLoginIsErrored(true);
            }

            if (error.response.status === 404) {
                setUsernameLogin('');
                return setUserLoginIsErrored(true);
            }
        }
    }

    async function handleSignup() {
        const url = `http://localhost:4000/api/user/signup`;
        const data = {
            login: usernameSignup,
            email: emailSignup,
            password: passwordSignup,
            passwordConfirm: passwordSignupConfirm
        };
        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.data);
    }

    return (
        <>
            <form className="Login__form">
                <h2 className="title is-2">Inscrivez-vous</h2>
                <div className="field">
                    <label className="label">Nom d'utilisateur</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="text" placeholder="ex: Kiruuah667" onChange={e => setUsernameSignup(e.target.value)} value={usernameSignup} />
                        <span className="icon is-small is-left">
                            <BsFillPersonFill />
                        </span>
                    </p>
                    <label className="label">Email (existant)</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="email" placeholder="ex: kiruuah667@otaku.fr" onChange={e => setEmailSignup(e.target.value)} value={emailSignup} />
                        <span className="icon is-small is-left">
                            <FaEnvelope />
                        </span>
                    </p>
                    <label className="label">Mot de passe</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="password" placeholder="ex: kiruuah667@otaku.fr" onChange={e => setPasswordSignup(e.target.value)} value={passwordSignup} />
                        <span className="icon is-small is-left">
                            <BsLockFill />
                        </span>
                    </p>
                    <label className="label">Confirmer mot de passe</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="password" placeholder="ex: kiruuah667@otaku.fr" onChange={e => setPasswordSignupConfirm(e.target.value)} value={passwordSignupConfirm} />
                        <span className="icon is-small is-left">
                            <BsLockFill />
                        </span>
                    </p>
                </div>
                <div className="my-button button">Inscription</div>
            </form>
            <p className="title is-1">OU</p>
            <form className="Login__form">
                <h2 className="title is-2">Connectez-vous</h2>
                <div className="field">
                    <label className="label">Email ou nom d'utilisateur</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className={userLoginIsErrored ? "input is-danger" : "input"} type="email" placeholder="ex: Kiruuah667" onChange={e => setUsernameLogin(e.target.value)} value={usernameLogin} />
                        <span className="icon is-small is-left">
                            <BsFillPersonFill />
                        </span>
                        {userLoginIsErrored ? <p class="help is-danger">Le nom d'utilisateur ou l'email sont incorrects</p> : null}
                    </p>
                    <label className="label">Email ou nom d'utilisateur</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className={passwordLoginIsErrored ? "input is-danger" : "input"} type="password" placeholder="ex: MyStr0ngP455w0Rd" onChange={e => setPasswordLogin(e.target.value)} value={passwordLogin} />
                        <span className="icon is-small is-left">
                            <BsLockFill />
                        </span>
                        {passwordLoginIsErrored ? <p class="help is-danger">Le mot de passe est incorrect!</p> : null}
                    </p>
                </div>
                <div className="my-button button" onClick={handleLogin}>Connexion</div>
            </form>
        </ >
    )
}

export const LoginStore = connect(
    state => ({
        user: userSelector(state)
    }),
    dispatch => ({
        onLogin: data => dispatch(loginUserAction(data))
    })
)(Login);