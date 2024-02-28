import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../../helpers/Api";
import AuthContext from "../../contexts/authContext";
import Path from "../../paths";
import StoresContext from "../../contexts/storesContext";


const Register = () => {
    const { setCredentials } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleCredentialsChange = (e) => {
        setUser(old => ({ ...old, [e.target.name]: e.target.value }));
    }

    const SubmitHandler = (e) => {
        e.preventDefault();

        if (!user.email || !user.password || !user.password_confirmation || user.password !== user.password_confirmation) {
            throw new Error('Please enter your email and password');
        }

        console.log(user);

        api.post('register', {email: user.email, password: user.password})
            // .then(
            //     response => setCredentials(credentials => ({
            //         ...credentials,
            //         ...response.data.user,
            //         'jwt': response.data.jwt,
            //     })))
            .then(navigate(Path.HOME))
            .catch(err => console.log(err))
    }

    return (
        <form
            className="container-xs vertical-center position-absolute top-50 start-50 translate-middle p-5 bg-white rounded-4 shadow-lg z-3 w-25"
            style={{ minWidth: '500px' }}
            onSubmit={SubmitHandler}
        >
            <div className="mb-3 text-center fs-1">Регистрация</div>

            <div className="mb-2 d-flex text-secondary">
                <span className="input-group-text" id="email-2"><i className="fa-solid fa-at"></i></span>
                <input type="email"
                    autoComplete="true"
                    className="form-control"
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    name="email"
                    value={user.email || ''}
                    onChange={handleCredentialsChange}
                />
            </div>

            <div className="mb-2 d-flex text-secondary">
                <span className="input-group-text" id="password"><i className="fa-solid fa-key"></i></span>
                <input type="password"
                    className="form-control"
                    placeholder="Парола"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    name="password"
                    value={user.password || ''}
                    onChange={handleCredentialsChange}
                />
            </div>

            <div className="mb-4 d-flex text-secondary">
                <span className="input-group-text" id="password-2"><i className="fa-solid fa-key"></i></span>
                <input type="password"
                    className="form-control"
                    placeholder="Потвърди паролата"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    name="password_confirmation"
                    value={user.password_confirmation || ''}
                    onChange={handleCredentialsChange}
                />
            </div>

            <div className="d-grid gap-2 mb-4">
                <button type="submit" className="btn btn-outline-primary">Потвърди</button>
            </div>

            <div className="d-flex justify-content-center">
                <p className="pe-2">Вече имате регистрация?</p>
                <Link to={Path.LOGIN}>Влезте тук</Link>
            </div>
            <p className="text-secondary text-center fs-9">След регистрацията се обърнете към администратора за достъп до приложението</p>

        </form>
    )
}

export default Register;