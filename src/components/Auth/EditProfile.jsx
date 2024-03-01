import { Link } from 'react-router-dom';
import { useContext } from 'react';

import Path from '../../paths';
import AuthContext from '../../contexts/authContext';

const EditProfile = () => {
    const { email } = useContext(AuthContext);

    return (
        <>
            <form
                className="container-xs vertical-center position-absolute top-50 start-50 translate-middle p-5 bg-white rounded-4 shadow-lg border border-1 border-secondary"
            // onSubmit={SubmitHandler}
            >
                <div className="text-center fs-1">Редактиране на профил</div>
                <div className="mb-4 text-center fs-5 text-primary">{email}</div>

                <div className="input-group mb-3 shadow dropdown">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-at"></i></span>
                    <input type="email"
                        autoComplete="true"
                        className="form-control"
                        placeholder="New email address"
                        aria-label="New email"
                        aria-describedby="basic-addon1"
                        name="email"
                    // value={user.email || ''}
                    // onChange={handleCredentialsChange}
                    />
                </div>

                <div className="input-group mb-3 shadow dropdown">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-at"></i></span>
                    <input type="email"
                        autoComplete="true"
                        className="form-control"
                        placeholder="Retype new email address"
                        aria-label="New email"
                        aria-describedby="basic-addon1"
                        name="email"
                    // value={user.email || ''}
                    // onChange={handleCredentialsChange}
                    />
                </div>

                <div className="input-group mb-3 shadow dropdown">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-key"></i></span>
                    <input type="password"
                        className="form-control"
                        placeholder="Current password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        name="password"
                    // value={user.password || ''}
                    // onChange={handleCredentialsChange}
                    />
                </div>

                <div className="input-group mb-3 shadow dropdown">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-key"></i></span>
                    <input type="password"
                        className="form-control"
                        placeholder="New password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        name="password"
                    // value={user.password || ''}
                    // onChange={handleCredentialsChange}
                    />
                </div>

                <div className="input-group mb-5 shadow dropdown">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-key"></i></span>
                    <input type="password"
                        className="form-control"
                        placeholder="Retype new password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        name="password"
                    // value={user.password || ''}
                    // onChange={handleCredentialsChange}
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
        </>
    );
}

export default EditProfile;