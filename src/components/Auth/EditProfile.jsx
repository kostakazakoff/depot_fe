import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';

import Path from '../../paths';
import AuthContext from '../../contexts/authContext';


const EditProfile = () => {
    const { email, name, last_name, phone } = useContext(AuthContext);
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
        // TODO:
    }

    return (
        <>
            <form
                className="container-xs vertical-center position-absolute top-50 start-50 translate-middle p-5 bg-white rounded-4 shadow-lg border border-1 border-secondary"
                onSubmit={SubmitHandler}
            >
                <div className="text-center fs-1">Редактиране на профил</div>
                <div className="mb-4 text-center fs-5 text-primary">{email}</div>

                <div className="input-group mb-3 shadow dropdown">
                    <label htmlFor='email_1' className="input-group-text" id="basic-addon1"><i className="fa-solid fa-at"></i></label>
                    <input type="email"
                        autoComplete="true"
                        className="form-control"
                        placeholder="New email address"
                        name="email_1"
                        id="email_1"
                        value={profile.email_1 || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-3 shadow dropdown">
                    <label htmlFor='email_2' className="input-group-text" id="basic-addon1"><i className="fa-solid fa-at"></i></label>
                    <input type="email"
                        autoComplete="true"
                        className="form-control"
                        placeholder="Retype new email address"
                        name="email_2"
                        id="email_2"
                        value={profile.email_2 || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-3 shadow dropdown">
                    <label htmlFor='password' className="input-group-text" id="basic-addon1"><i className="fa-solid fa-key"></i></label>
                    <input type="password"
                        className="form-control"
                        placeholder="Current password"
                        name="password"
                        id="password"
                        value={profile.password || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-3 shadow dropdown">
                    <label htmlFor='password_1' className="input-group-text" id="basic-addon1"><i className="fa-solid fa-key"></i></label>
                    <input type="password"
                        className="form-control"
                        placeholder="New password"
                        name="password_1"
                        id="password_1"
                        value={profile.password_1 || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-3 shadow dropdown">
                    <label htmlFor='password_2' className="input-group-text" id="basic-addon1"><i className="fa-solid fa-key"></i></label>
                    <input type="password"
                        className="form-control"
                        placeholder="Retype new password"
                        name="password_2"
                        id="password_2"
                        value={profile.password_2 || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-3 shadow dropdown">
                    <label htmlFor='first_name' className="input-group-text" id="basic-addon1"><i className="fa-solid fa-file-signature"></i></label>
                    <input type="text"
                        className="form-control"
                        placeholder="Your first name"
                        name="first_name"
                        id="first_name"
                        value={profile.first_name || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-3 shadow dropdown">
                    <label htmlFor='last_name' className="input-group-text" id="basic-addon1"><i className="fa-solid fa-file-signature"></i></label>
                    <input type="text"
                        className="form-control"
                        placeholder="Your last name"
                        name="last_name"
                        id="last_name"
                        value={profile.last_name || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-5 shadow dropdown">
                    <label htmlFor='phone' className="input-group-text" id="basic-addon1"><i className="fa-solid fa-file-signature"></i></label>
                    <input type="text"
                        className="form-control"
                        placeholder="Your phone number"
                        name="phone"
                        id="phone"
                        value={profile.phone || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="d-grid gap-2 mb-3">
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
        </>
    );
}

export default EditProfile;