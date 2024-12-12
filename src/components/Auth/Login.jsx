import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../../helpers/Api";
import AuthStateContext from "../../contexts/authContext";
import Path from "../../paths";
import StoresContext from "../../contexts/storesContext";
import Swal from "sweetalert2";
import APIPath from "../../apiPaths";

// TODO: Forgot password, email confirmation
const Login = () => {
    const { setCredentials } = AuthStateContext();
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

    const ResetPassword = () => {
        if (!user.email) {
            Swal.fire(
                "Неуспешна операция!",
                'Моля въведете имейл адрес',
                "error"
            )
        } else {
            api.post(APIPath.FORGOT_PASSWORD, { 'email': user.email })
                .catch(err => console.log(err))
                .then(response => response.data)
                .then(data => handlePasswordReset(data.message));
        }
    }

    const handlePasswordReset = (message) => {
        if (message !== 'success') {
            Swal.fire(
                "Грешка!",
                message,
                "error"
            );
        } else {
            Swal.fire(
                "Ще получите линк за обновяване на паролата на вашия имейл адрес",
                "Кликнете върху линка, след което си създайте нова парола.",
                "success"
            );
        }
    };

    useEffect(() => {
        api.get('stores/list')
            .then(response => response.data)
            .then(data => setStores(data))
            .catch(() => navigate(Path.Error404));
            //TODO:
        // api.post('/logs/delete_old')
        //     .then(response => response.data)
        //     .then(data => console.log(data))
        //     .catch(() => navigate(Path.Error404));
    }, []);

    return (
        <>
            <form
                className="container-xs vertical-center position-absolute top-50 start-50 translate-middle p-5 bg-white rounded-2 shadow-lg z-3 w-25"
                style={{ minWidth: '500px' }}
                onSubmit={SubmitHandler}
            >
                <div className="mb-3 text-center fs-1">Вход</div>

                <div className="input-group mb-3 text-secondary">
                    <label htmlFor="email" className="input-group-text"><i className="fa-solid fa-at"></i></label>
                    <input
                        id="email"
                        type="email"
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

                <div className="input-group mb-2 text-secondary">
                    <label htmlFor="password" className="input-group-text"><i className="fa-solid fa-key"></i></label>
                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        placeholder="Парола"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        name="password"
                        value={user.password || ''}
                        onChange={handleCredentialsChange}
                    />
                </div>

                <div className="d-flex justify-content-center mb-4">
                    <Link
                        to='#'
                        type="button"
                        onClick={ResetPassword}
                    >
                        Забравили сте паролата си?
                    </Link>
                </div>

                <div className="d-grid gap-2 mb-4">
                    <button type="submit" className="btn btn-outline-primary">Потвърди</button>
                </div>

                <div className="d-flex justify-content-center">
                    <Link to={Path.REGISTER}>Нямате регистрация?</Link>
                </div>

            </form>
        </>
    );
}

export default Login;