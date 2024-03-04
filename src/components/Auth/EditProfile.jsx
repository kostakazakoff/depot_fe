import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import Path from '../../paths';
import AuthContext from '../../contexts/authContext';
import api from '../../helpers/Api';
import Swal from 'sweetalert2';


const EditProfile = () => {
    const { email, name, last_name, phone, setCredentials } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        'email_1': null,
        'email_2': null,
        'password': null,
        'password_1': null,
        'password_2': null,
        'first_name': name,
        'last_name': last_name,
        'phone': phone
    });

    const handleChange = (e) => {
        setProfile(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        const userData = {
            'email': profile.email_1 || email,
            'password': profile.password,
            'new_password': profile.password_1,
            'first_name': profile.first_name,
            'last_name': profile.last_name,
            'phone': profile.phone
        }

        api.post('edit_my_profile', userData)
            .then(response => handleResponse(response.data))
            .catch(() => navigate(Path.Error404));
    }

    const handleResponse = (response) => {
        if (response.message !== 'success') {
            Swal.fire(
                "Неуспешна операция!",
                response.message,
                "error"
            )
        } else {
            console.log(response);
            setCredentials(credentials => ({
                ...credentials,
                'email': response.user.email,
                'first_name': response.profile.first_name,
                'last_name': response.profile.last_name,
                'phone': response.profile.phone,
            }))
            Swal.fire(
                "Готово!",
                "Профилът ви е редактиран.",
                "success"
            );
            navigate(Path.HOME);
        }
    }

    return (
        <div className='p-5'>
            <form
                className="container-xs vertical-center position-absolute top-50 start-50 translate-middle p-5 rounded-4 shadow-lg mt-5 mb-5"
                onSubmit={SubmitHandler}
            >
                <div className="text-center fs-1">Редактиране на профил</div>
                <div className="mb-4 text-center fs-5 text-primary">{email}</div>

                <div className="input-group mb-3">
                    <label htmlFor='password' className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-key text-warning"></i>
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Текуща парола"
                        name="password"
                        id="password"
                        value={profile.password || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <label htmlFor='email_1' className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-at"></i>
                    </label>
                    <input
                        type="email"
                        autoComplete="true"
                        className="form-control"
                        placeholder="Нов email"
                        name="email_1"
                        id="email_1"
                        value={profile.email_1 || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <label htmlFor='email_2' className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-at"></i>
                    </label>
                    <input
                        type="email"
                        autoComplete="true"
                        className="form-control"
                        placeholder="Потвърди email"
                        name="email_2"
                        id="email_2"
                        value={profile.email_2 || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <label htmlFor='password_1' className="input-group-text" id="basic-addon1">

                        <i className="fa-solid fa-key"></i>
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Нова парола"
                        name="password_1"
                        id="password_1"
                        value={profile.password_1 || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <label htmlFor='password_2' className="input-group-text" id="bas
                    ic-addon1"><i className="fa-solid fa-key"></i>
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Потвърди парола"
                        name="password_2"
                        id="password_2"
                        value={profile.password_2 || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <label htmlFor='first_name' className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-file-signature"></i>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Име"
                        name="first_name"
                        id="first_name"
                        value={profile.first_name || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <label htmlFor='last_name' className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-file-signature"></i>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Фамилия"
                        name="last_name"
                        id="last_name"
                        value={profile.last_name || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-4">
                    <label htmlFor='phone' className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-file-signature"></i>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Телефон"
                        name="phone"
                        id="phone"
                        value={profile.phone || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="d-grid gap-2 mb-2">
                    <button type="submit" className="btn btn-outline-primary">
                        <i className="fa-solid fa-pen-to-square pe-2"></i>
                        Редактирай
                    </button>
                </div>

                <div className="d-grid gap-2">
                    <Link to={Path.HOME} className="btn btn-outline-dark">
                        <i className="fa-solid fa-ban pe-2"></i>
                        Отказ
                    </Link>
                </div>

            </form>
        </div>
    );
}

export default EditProfile;