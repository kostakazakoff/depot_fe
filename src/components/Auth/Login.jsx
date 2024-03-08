import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../../helpers/Api";
import AuthContext from "../../contexts/authContext";
import Path from "../../paths";
import StoresContext from "../../contexts/storesContext";
import Swal from "sweetalert2";


const Login = () => {
    const { setCredentials } = useContext(AuthContext);
    const { setStores } = useContext(StoresContext);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleCredentialsChange = (e) => {
        setUser(old => ({ ...old, [e.target.name]: e.target.value }));
    }

    const HandleResponse = (response) => {
        if (response.message !== 'success') {
            Swal.fire(
                "Неуспешна автентикация!",
                response.message,
                "error"
            )
        } else {
            setCredentials(credentials => ({
                ...credentials,
                ...response.user,
                'jwt': response.jwt,
                'first_name': response.first_name,
                'last_name': response.last_name,
                'phone': response.phone,
            }));
            navigate(Path.HOME);
        }
    };

    const SubmitHandler = (e) => {
        e.preventDefault();

        api.post('login', user)
            .then(
                response => HandleResponse(response.data)
            )
            .catch(() => navigate(Path.Error404));
    }

    useEffect(() => {
        api.get('stores')
            .then(response => response.data)
            .then(data => setStores(data))
            .catch(() => navigate(Path.Error404));
        api.post('/logs/delete_old')
        .then(response => response.data)
        .then(data => console.log(data))
        .catch(() => navigate(Path.Error404));
    }, []);

    return (
        <>
            <form
                className="container-xs vertical-center position-absolute top-50 start-50 translate-middle p-5 bg-white rounded-2 shadow-lg z-3 w-25"
                style={{ minWidth: '500px' }}
                onSubmit={SubmitHandler}
            >
                <div className="mb-3 text-center fs-1">Вход</div>

                <div className="mb-2 d-flex text-secondary">
                    <span className="input-group-text" id="email"><i className="fa-solid fa-at"></i></span>
                    <input type="email"
                        autoComplete="true"
                        className="form-control"
                        placeholder="Електронна поща"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        name="email"
                        value={user.email || ''}
                        onChange={handleCredentialsChange}
                    />
                </div>

                <div className="mb-4 d-flex text-secondary">
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

                <div className="d-grid gap-2 mb-4">
                    <button type="submit" className="btn btn-outline-primary">Потвърди</button>
                </div>

                <div className="d-flex justify-content-center">
                    <p className="pe-2">Нямате регистрация?</p>
                    <Link to={Path.REGISTER}>Регистрирайте се тук</Link>
                </div>

            </form>
        </>
    );
}

export default Login;