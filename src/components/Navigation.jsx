import { Link } from 'react-router-dom';
import { useContext } from 'react';

import AuthContext from "../contexts/authContext";
import StoresContext from '../contexts/storesContext';
import Path from '../paths';


export default function Navigation() {
    const { email, isAuthenticated } = useContext(AuthContext);
    const { stores } = useContext(StoresContext);

    console.log(`isAuthenticated: ${isAuthenticated}`);
    // console.log(`User: ${email}`);

    return (
        <>
            <nav className="navbar navbar-expand bg-dark navbar-dark fixed-top z-index-3">

                <ul className="navbar-nav ms-4 me-auto">

                    <li className="nav-item">
                        <Link className="nav-link" to={Path.HOME}>
                            Начало
                        </Link>
                    </li>

                    {isAuthenticated &&
                        <li className="nav-item">
                            <Link className="nav-link" to={Path.ARTICLES}>
                                Артикули
                            </Link>
                        </li>
                    }

                    {isAuthenticated &&
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Складове
                            </Link>

                            <ul className="dropdown-menu dropdown-menu-dark">
                                {stores.map(store => (
                                    <li key={store.id}>
                                        <Link className="dropdown-item" to={Path.STORE} state={{ id: store.id }}>
                                            {store.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    }

                    {isAuthenticated &&
                        <li className="nav-item">
                            <Link className="nav-link" to={Path.ADD_ARTICLE}>
                                Добави артикул
                            </Link>
                        </li>
                    }

                </ul>

                <ul className="navbar-nav me-4">
                    <li className="nav-item dropdown">
                        <Link
                            className="nav-link dropdown-toggle"
                            to="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="fa-solid fa-user"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                            {isAuthenticated &&
                                <li>
                                    <Link className="dropdown-item" to={Path.EDIT_PROFILE}>
                                        {email}
                                    </Link>
                                </li>
                            }
                            {isAuthenticated &&
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                            }
                            {!isAuthenticated &&
                                <li>
                                    <Link className="dropdown-item" to={Path.LOGIN}>
                                        Вписване
                                    </Link>
                                </li>
                            }
                            {isAuthenticated &&
                                <li>
                                    <Link className="dropdown-item" to={Path.LOGOUT}>
                                        Отписване
                                    </Link>
                                </li>
                            }
                        </ul>
                    </li>
                </ul>

            </nav>
        </>
    )
}