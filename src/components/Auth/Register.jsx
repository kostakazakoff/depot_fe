import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../../helpers/Api";
import Path from "../../paths";
import Swal from "sweetalert2";


const Register = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleCredentialsChange = (e) => {
        setUser(old => ({ ...old, [e.target.name]: e.target.value }));
    }

    const HandleResponse = (response) => {
        if (response.message !== 'success') {
            Swal.fire(
                "Неуспешна регистрация!",
                response.message,
                "error"
            )
        } else {
            Swal.fire(
                'Успешна регистрация!',
                'Обадете се на вашия администратор за оторизация на достъпа.',
                'success'
            );
            navigate(Path.HOME);
        }
    }

    const SubmitHandler = (e) => {
        e.preventDefault();

        if (user.password !== user.password_confirmation) {
            Swal.fire(
                "Неуспешна регистрация!",
                'Паролата и потвърждението не съвпадат! Моля, въведете ги отново.',
                "error"
            )
            // throw new Error('Паролата и потвърждението не съвпадат! Моля, въведете ги отново.');
        } else {
            api.post('register', { email: user.email, password: user.password })
                .then(response => HandleResponse(response.data))
                .catch(() => navigate(Path.Error404));
        }
    }

    return (
        <form
            className="container-xs vertical-center position-absolute top-50 start-50 translate-middle p-5 bg-white rounded-2 shadow-lg z-3 w-25"
            style={{ minWidth: '500px' }}
            onSubmit={SubmitHandler}
        >
            <div className="mb-3 text-center fs-1">Регистрация</div>

            <div className="input-group mb-3">
                <label htmlFor="email" className="input-group-text"><i className="fa-solid fa-at"></i></label>
                <input
                    id="email"
                    type="email"
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

            <div className="input-group mb-3">
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

            <div className="input-group mb-4">
                <label htmlFor="password_confirmation" className="input-group-text" id="password-2"><i className="fa-solid fa-key"></i></label>
                <input
                    id="password_confirmation"
                    type="password"
                    className="form-control"
                    placeholder="Потвърди паролата"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    name="password_confirmation"
                    value={user.password_confirmation || ''}
                    onChange={handleCredentialsChange}
                />
            </div>

            <div className="d-grid gap-2 mb-3">
                <button type="submit" className="btn btn-outline-primary">
                    <i className="fa-solid fa-check pe-2"></i>
                    Потвърди
                </button>
            </div>

            <div className="d-flex justify-content-center mb-3">
                {/* <p className="pe-2">Вече имате регистрация?</p> */}
                <Link to={Path.LOGIN}>Вече имате регистрация?</Link>
            </div>
            <p className="text-secondary text-center fs-9">След регистрацията се обърнете към администратора за оторизация на достъпа</p>

        </form>
    )
}

export default Register;