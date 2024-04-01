import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom";
import api from "../../helpers/Api";
import APIPath from "../../apiPaths";

export default function ResetPassword() {
    const { token } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const [credentials, setCredentials] = useState({});

    useEffect(() => {
        setCredentials(state => ({
            ...state,
            ['email']: email,
            ['token']: token
        }))
    }, [email, token])

    const handleInputChange = (e) => {
        setCredentials(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const SubmitHandler = (e) => {
        e.preventDefault();

        api.post(APIPath.CHANGE_FORGOTEN_PASSWORD, credentials)
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }

    return (
        <form
            className="container-xs vertical-center position-absolute top-50 start-50 translate-middle p-5 bg-white rounded-2 shadow-lg z-3 w-25"
            style={{ minWidth: '500px' }}
            onSubmit={SubmitHandler}
        >
            <div className="mb-3 text-center fs-1">Смяна на парола</div>

            <div className="input-group mb-3">
                <label htmlFor="password" className="input-group-text"><i className="fa-solid fa-key"></i></label>
                <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Нова парола"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    name="password"
                    value={credentials.password || ''}
                    onChange={handleInputChange}
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
                    value={credentials.password_confirmation || ''}
                    onChange={handleInputChange}
                />
            </div>

            <div className="d-grid gap-2 mb-3">
                <button type="submit" className="btn btn-outline-primary">
                    <i className="fa-solid fa-check pe-2"></i>
                    Потвърди
                </button>
            </div>
        </form>
    )
}
