import { Link } from 'react-router-dom';
import { useContext } from 'react';

import AuthContext from "../contexts/authContext";
import Path from '../paths';


export default function Navigation() {
    const { name, isAuthenticated, role, email } = useContext(AuthContext);

    console.log(`isAuthenticated: ${isAuthenticated}`);

    return (
        <>
            <nav className="navbar navbar-expand bg-dark navbar-dark fixed-top z-index-3">

                <ul className="navbar-nav ms-4 me-auto">

                    <li className="nav-item me-3">
                        <Link className="nav-link" to={Path.HOME}>
                            <i className="fa-solid fa-house pe-2"></i>
                            Начало
                        </Link>
                    </li>

                    {isAuthenticated && (role === 'superuser' || role === 'admin' || role === 'staff') &&
                        <li className="nav-item me-3">
                            <Link className="nav-link" to={Path.ARTICLES}>
                                <i className="fa-solid fa-boxes-stacked pe-2"></i>
                                Складови наличности
                            </Link>
                        </li>
                    }

                    {isAuthenticated && (role === 'superuser' || role === 'admin' || role === 'staff') &&
                        <li className="nav-item">
                            <Link className="nav-link" to={Path.ADD_ARTICLE}>
                                <i className="fa-solid fa-square-plus pe-2"></i>
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
                                        {name || email}
                                    </Link>
                                </li>
                            }
                            {isAuthenticated &&
                                <li>
                                    <hr className="dropdown-divider bg-light" />
                                </li>
                            }
                            {!isAuthenticated &&
                                <li>
                                    <Link className="dropdown-item" to={Path.LOGIN}>
                                        Вписване
                                    </Link>
                                </li>
                            }
                            {!isAuthenticated &&
                                <li>
                                    <Link className="dropdown-item" to={Path.REGISTER}>
                                        Регистриране
                                    </Link>
                                </li>
                            }
                            {isAuthenticated && (role === 'admin' || role === 'superuser') &&
                                <li>
                                    <Link className="dropdown-item" to={Path.DASHBOARD}>
                                        <i className="fa-solid fa-screwdriver-wrench pe-2"></i>
                                        Админ панел
                                    </Link>
                                </li>
                            }
                            {isAuthenticated &&
                                <li>
                                    <Link className="dropdown-item" to={Path.LOGOUT}>
                                        <i className="fa-solid fa-arrow-right-from-bracket pe-2"></i>
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