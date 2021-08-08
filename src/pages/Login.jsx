import { FaEnvelope, FaCheck } from 'react-icons/fa'
import { BsFillPersonFill, BsLockFill } from 'react-icons/bs'

function Login() {
    return (
        <div id="Login">
            <form class="Login__form">
                <h2 className="title is-2">Inscrivez-vous</h2>
                <div class="field">
                    <label class="label">Nom d'utilisateur</label>
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="email" placeholder="ex: Kiruuah667" />
                        <span class="icon is-small is-left">
                            <BsFillPersonFill />
                        </span>
                    </p>
                    <label class="label">Email (existant)</label>
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="password" placeholder="ex: kiruuah667@otaku.fr" />
                        <span class="icon is-small is-left">
                            <FaEnvelope />
                        </span>
                    </p>
                    <label class="label">Mot de passe</label>
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="password" placeholder="ex: kiruuah667@otaku.fr" />
                        <span class="icon is-small is-left">
                            <BsLockFill />
                        </span>
                    </p>
                    <label class="label">Confirmer mot de passe</label>
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="password" placeholder="ex: kiruuah667@otaku.fr" />
                        <span class="icon is-small is-left">
                            <BsLockFill />
                        </span>
                    </p>
                </div>
                <div className="my-button">Inscription</div>
            </form>
            <p className="title is-1">OU</p>
            <form className="Login__form">
                <h2 className="title is-2">Connectez-vous</h2>
                <div class="field">
                    <label class="label">Email ou nom d'utilisateur</label>
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="email" placeholder="ex: Kiruuah667" />
                        <span class="icon is-small is-left">
                            <BsFillPersonFill />
                        </span>
                    </p>
                    <label class="label">Email ou nom d'utilisateur</label>
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="password" placeholder="Mot de passe" placeholder="ex: MyStr0ngP455w0Rd" />
                        <span class="icon is-small is-left">
                            <BsLockFill />
                        </span>
                    </p>
                </div>
                <div className="my-button">Connexion</div>
            </form>
        </div>
    )
}

export default Login;