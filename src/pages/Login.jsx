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

    const initialErrorState = {
        status: false,
        message: '',
    }

    const [userLoginIsErrored, setUserLoginIsErrored] = useState({
        status: false,
        message: '',
    });

    const [passwordLoginIsErrored, setPasswordLoginIsErrored] = useState({
        status: false,
        message: '',
    });

    const [userSignupIsErrored, setUserSignupIsErrored] = useState({
        status: false,
        message: '',
    });

    const [emailSignupIsErrored, setEmailSignupIsErrored] = useState({
        status: false,
        message: '',
    });

    const [passwordSignupIsErrored, setPasswordSignupIsErrored] = useState({
        status: false,
        message: '',
    });

    const [accountIsCreated, setAccountIsCreated] = useState({
        status: false,
        message: '',
    });

    async function handleLogin() {
        try {
            setUserLoginIsErrored(initialErrorState);
            setPasswordLoginIsErrored(initialErrorState);

            if (!usernameLogin) {
                return setUserLoginIsErrored({
                    status: true,
                    message: 'Vous devez entrer un nom d\'utilisateur !',
                });
            }

            if (!passwordLogin) {
                return setPasswordLoginIsErrored({
                    status: true,
                    message: 'Vous devez entrer un mot de passe !',
                });
            }

            const url = `http://localhost:4000/api/user/login`;

            const data = {
                login: usernameLogin,
                password: passwordLogin
            }

            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            onLogin(response.data);

        } catch (error) {
            if (error.response.status === 401 && error.response.data.login) {
                setPasswordLogin('');
                return setPasswordLoginIsErrored({
                    status: true,
                    message: 'Le mot de passe est invalide !',
                });
            }

            if (error.response.status === 404) {
                setUsernameLogin('');
                setPasswordLogin('');
                return setUserLoginIsErrored({
                    status: true,
                    message: 'L\'utilisateur n\'existe pas !',
                });
            }
        }
    }

    async function handleSignup() {
        try {

            setUserSignupIsErrored(initialErrorState);
            setEmailSignupIsErrored(initialErrorState);
            setPasswordSignupIsErrored(initialErrorState);

            if (!usernameSignup) {
                return setUserSignupIsErrored({
                    status: true,
                    message: 'Vous devez entrer un nom d\'utilisateur !',
                });
            }

            if (!emailSignup) {
                return setEmailSignupIsErrored({
                    status: true,
                    message: 'Vous devez entrer une adresse email !',
                });
            }

            if (!passwordSignup) {
                return setPasswordSignupIsErrored({
                    status: true,
                    message: 'Vous devez entrer un mot de passe !',
                });
            }

            if (passwordSignup !== passwordSignupConfirm) {
                setPasswordSignup('');
                setPasswordSignupConfirm('');
                return setPasswordSignupIsErrored({
                    status: true,
                    message: 'Les mots de passe ne sont pas identiques !',
                });
            }

            const url = `http://localhost:4000/api/user/signup`;

            const data = {
                username: usernameSignup,
                email: emailSignup,
                password: passwordSignup,
                passwordConfirm: passwordSignupConfirm
            };

            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                setUsernameLogin(usernameSignup);
                setPasswordLogin(passwordSignup);
                setAccountIsCreated({
                    status: true,
                    message: 'Votre compte a été créé, veuillez vous connecter !',
                });
            }

        } catch (error) {
            console.dir(error.response);
            if (error.response.status === 400 && error.response.data.message === 'Username is taken!') {
                setUsernameSignup('');
                return setUserSignupIsErrored({
                    status: true,
                    message: 'Ce nom d\'utilisateur existe déjà !',
                });
            }

            if (error.response.status === 400 && error.response.data.message === 'Email is taken!') {
                setEmailSignup('');
                return setEmailSignupIsErrored({
                    status: true,
                    message: 'Cette adresse email existe déjà !',
                });
            }
        }
    }

    return (
        <>
            <form className="Login__form">
                <h2 className="title is-2">Inscrivez-vous</h2>
                <div className="field">
                    <label className="label">Nom d'utilisateur</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className={userSignupIsErrored.status ? "input is-danger" : "input"} type="text" placeholder="ex: Kiruuah667" onChange={e => setUsernameSignup(e.target.value)} value={usernameSignup} />
                        <span className="icon is-small is-left">
                            <BsFillPersonFill />
                        </span>
                        {userSignupIsErrored.status ? <p class="help is-danger">{userSignupIsErrored.message}</p> : null}
                    </p>
                    <label className="label">Email (existant)</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className={emailSignupIsErrored.status ? "input is-danger" : "input"} type="email" placeholder="ex: kiruuah667@otaku.fr" onChange={e => setEmailSignup(e.target.value)} value={emailSignup} />
                        <span className="icon is-small is-left">
                            <FaEnvelope />
                        </span>
                        {emailSignupIsErrored.status ? <p class="help is-danger">{emailSignupIsErrored.message}</p> : null}
                    </p>
                    <label className="label">Mot de passe</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className={passwordSignupIsErrored.status ? "input is-danger" : "input"} type="password" placeholder="ex: MyStr0ngP455w0Rd" onChange={e => setPasswordSignup(e.target.value)} value={passwordSignup} />
                        <span className="icon is-small is-left">
                            <BsLockFill />
                        </span>
                        {passwordSignupIsErrored.status ? <p class="help is-danger">{passwordSignupIsErrored.message}</p> : null}
                    </p>
                    <label className="label">Confirmer mot de passe</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className={passwordSignupIsErrored.status ? "input is-danger" : "input"} type="password" placeholder="ex: MyStr0ngP455w0Rd" onChange={e => setPasswordSignupConfirm(e.target.value)} value={passwordSignupConfirm} />
                        <span className="icon is-small is-left">
                            <BsLockFill />
                        </span>
                        {passwordSignupIsErrored.status ? <p class="help is-danger">{passwordSignupIsErrored.message}</p> : null}
                    </p>
                </div>
                <div onClick={handleSignup} className="my-button button">Inscription</div>
            </form>
            <p className="title is-1">OU</p>
            <form className="Login__form">
                <h2 className="title is-2">Connectez-vous</h2>
                <div className="field">
                    <label className="label">Email ou nom d'utilisateur</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className={userLoginIsErrored.status ? "input is-danger" : "input"} type="email" placeholder="ex: Kiruuah667" onChange={e => setUsernameLogin(e.target.value)} value={usernameLogin} />
                        <span className="icon is-small is-left">
                            <BsFillPersonFill />
                        </span>
                        {userLoginIsErrored.status ? <p class="help is-danger">{userLoginIsErrored.message}</p> : null}
                        {accountIsCreated.status ? <p class="help is-success">{accountIsCreated.message}</p> : null}
                    </p>
                    <label className="label">Email ou nom d'utilisateur</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className={passwordLoginIsErrored.status ? "input is-danger" : "input"} type="password" placeholder="ex: MyStr0ngP455w0Rd" onChange={e => setPasswordLogin(e.target.value)} value={passwordLogin} />
                        <span className="icon is-small is-left">
                            <BsLockFill />
                        </span>
                        {passwordLoginIsErrored.status ? <p class="help is-danger">{passwordLoginIsErrored.message}</p> : null}
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