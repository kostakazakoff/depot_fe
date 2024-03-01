import { useContext, useEffect, useState } from "react";
import authContext from "../contexts/authContext";
import { useNavigate, Link } from "react-router-dom";
import Path from "../paths"
import api from "../helpers/Api";
import Swal from "sweetalert2";


const Dashboard = () => {
    const { admin } = useContext(authContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState({});
    const [userToEdit, setUserToEdit] = useState({});


    const getUsersList = () => {
        api.get('dashboard/users_list')
            .then(response => setUsers(response.data.users))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        !admin && navigate(Path.HOME);
        getUsersList();
    }, []);

    const handleUserToEditSelect = (e) => {
        setUserToEdit({
            'id': users[e.target.value] ? users[e.target.value].id : '',
            'email': users[e.target.value] ? users[e.target.value].email : '',
            'role': users[e.target.value] ? users[e.target.value].role : '',
            'first_name': users[e.target.value] ? users[e.target.value].profile.first_name : '',
            'last_name': users[e.target.value] ? users[e.target.value].profile.last_name : '',
            'phone': users[e.target.value] ? users[e.target.value].profile.phone : ''
        });
    }

    const handleChange = (e) => {
        setUserToEdit(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        api.post(`dashboard/edit_user/${userToEdit.id}`, {
            'id': userToEdit.id,
            'email': userToEdit.email,
            'role': userToEdit.role,
            'first_name': userToEdit.first_name,
            'last_name': userToEdit.last_name,
            'phone': userToEdit.phone
        })
            .then(getUsersList())
            .then(Swal.fire(
                "Готово!",
                "Потребителят беше променен.",
                "success"
            ))
            .catch(err => console.log(err));
    }

    const deleteUser = () => {
        const id = userToEdit.id;
        api.post(`dashboard/delete_user/${id}`)
            .then(setUserToEdit({}))
            .then(getUsersList())
            .then(Swal.fire(
                "Готово!",
                "Потребителят беше изтрит.",
                "success"
            ))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        Object.values(users).forEach(user => {
            console.log(user);
        })
    }, [users]);

    useEffect(() => {
        Object.keys(userToEdit).forEach(k => console.log(k, userToEdit[k]));
    }, [userToEdit]);

    return (
        <>
            <form
                className="container-xs vertical-center position-absolute top-50 start-50 translate-middle p-5 bg-white rounded-4 shadow-lg z-3 w-25"
                style={{ minWidth: '500px' }}
                onSubmit={SubmitHandler}
            >

                <div className="input-group mb-3 shadow dropdown">
                    <label className="input-group-text" htmlFor="user">Персонал</label>
                    <select
                        id="user"
                        name="user"
                        className="form-select"
                        onChange={handleUserToEditSelect}
                    >
                        <option value="">Избери потребител</option>
                        {users && Object.keys(users).map(key => (
                            <option key={key} value={key}>
                                {users[key].profile.first_name
                                    ? users[key].profile.first_name
                                    : users[key].email
                                }
                            </option>
                        ))}
                    </select>
                </div>

                <div className="input-group mb-3 shadow dropdown">
                    <label className="input-group-text" htmlFor="role">Роля</label>
                    <select
                        id="role"
                        name='role'
                        className="form-select"
                        value={userToEdit.role}
                        onChange={handleChange}
                    >
                        <option value=''>
                            Назначи роля
                        </option>
                        <option value='superuser' hidden={userToEdit && userToEdit.role == 'superuser'}>
                            Superuser
                        </option>
                        <option value='admin' hidden={userToEdit && userToEdit.role == 'admin'}>
                            Администратор
                        </option>
                        <option value='staff' hidden={userToEdit && userToEdit.role == 'staff'}>
                            Персонал
                        </option>
                    </select>
                </div>

                <div className="input-group mb-3 d-flex shadow text-secondary">
                    <label className="input-group-text" htmlFor="email">Email</label>
                    <input type="email"
                        id="email"
                        autoComplete="true"
                        className="form-control"
                        aria-describedby="basic-addon1"
                        name="email"
                        value={userToEdit && userToEdit.email || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-3 d-flex shadow text-secondary">
                    <label className="input-group-text" htmlFor="first_name">Име</label>
                    <input type="text"
                        id="first_name"
                        autoComplete="true"
                        className="form-control"
                        aria-describedby="basic-addon1"
                        name="first_name"
                        value={userToEdit && userToEdit.first_name || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-3 d-flex shadow text-secondary">
                    <label className="input-group-text" htmlFor="last_name">Фамилия</label>
                    <input type="text"
                        id="last_name"
                        autoComplete="true"
                        className="form-control"
                        aria-describedby="basic-addon1"
                        name="last_name"
                        value={userToEdit && userToEdit.last_name || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-3 d-flex shadow text-secondary">
                    <label className="input-group-text" htmlFor="phone">Телефон</label>
                    <input type="text"
                        id="phone"
                        autoComplete="true"
                        className="form-control"
                        aria-describedby="basic-addon1"
                        name="phone"
                        value={userToEdit && userToEdit.phone || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="d-grid gap-2 mt-5">
                    <button
                        type="submit"
                        className="btn btn-outline-primary"
                        disabled={!userToEdit.id}
                    >
                        Потвърди промяната
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={deleteUser}
                        disabled={!userToEdit.id}
                    >
                        Изтрий потребител
                    </button>
                    <Link
                        to={Path.REGISTER}
                        type="button"
                        className="btn btn-outline-dark"
                    >
                        Добави потребител
                    </Link>
                    <Link
                        type="button"
                        className="btn btn-outline-dark"
                    >
                        Назад
                    </Link>
                </div>

            </form >
        </>
    )
}

export default Dashboard;