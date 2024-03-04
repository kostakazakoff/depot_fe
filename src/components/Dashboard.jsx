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
            .catch(() => navigate(Path.Error404));
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
            .then(response => handleEditUserResponse(response.data)
                .then(getUsersList())
                .catch(() => navigate(Path.Error404))
                .then(Swal.fire(
                    "Готово!",
                    "Данните на потребителя бяха променени.",
                    "success"
                )));
    }

    const deleteUser = () => {
        const id = userToEdit.id;
        api.post(`dashboard/delete_user/${id}`)
            .then(response => handleUserDeletionResponse(response.data))
            // .then(getUsersList())
            // .then(Swal.fire(
            //     "Готово!",
            //     "Потребителят беше изтрит.",
            //     "success"
            // ))
            // .catch(err => console.log(err));
    }

    const handleEditUserResponse = (response) => {
        if (response.message !== 'success') {
            Swal.fire(
                "Неуспешна операция!",
                response.message,
                "error"
            )
        } else {
            getUsersList();
            Swal.fire(
                "Готово!",
                "Данните на потребителя бяха променени.",
                "success"
            );
        }
    }

    const handleUserDeletionResponse = (response) => {
        if (response.message !== 'success') {
            Swal.fire(
                "Неуспешна операция!",
                response.message,
                "error"
            )
        } else {
            setUserToEdit({});
            getUsersList()
                .then(Swal.fire(
                    "Готово!",
                    "Потребителят беше изтрит.",
                    "success"
                ))
        }

    }

    const HandleUserDeletion = () => {
        Swal.fire({
            title: "Сигурен ли сте?",
            text: "Потребителят ще бъде изтрит от базата данни!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Да, изтрий!",
        })
            .then(result => {
                if (result.isConfirmed) {
                    deleteUser()
                        .catch(() => (navigate(Path.Error404)));
                }
            })
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
                <div className="text-center fs-1 mb-3">Админ панел</div>

                <div className="input-group mb-3 dropdown">
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

                <div className="input-group mb-3 dropdown">
                    <label className="input-group-text" htmlFor="role">Роля</label>
                    <select
                        id="role"
                        name='role'
                        className="form-select"
                        value={userToEdit.role}
                        onChange={handleChange}
                    >
                        <option value='member'>
                            Без достъп
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

                <div className="input-group mb-3 d-flex text-secondary">
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

                <div className="input-group mb-3 d-flex text-secondary">
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

                <div className="input-group mb-3 d-flex text-secondary">
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

                <div className="input-group mb-3 d-flex text-secondary">
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

                <div className="d-grid gap-2 mt-4">
                    <button
                        type="submit"
                        className="btn btn-outline-primary"
                        disabled={!userToEdit.id}
                    >
                        <i className="fa-solid fa-pen-to-square pe-2 text-primary"></i>
                        Редактирай
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={HandleUserDeletion}
                        disabled={!userToEdit.id}
                    >
                        <i className="fa-solid fa-trash pe-2 text-danger"></i>
                        Изтрий
                    </button>
                    <Link
                        to={Path.REGISTER}
                        type="button"
                        className="btn btn-outline-dark"
                    >
                        <i className="fa-solid fa-user-plus pe-2 text-primary"></i>
                        Добави потребител
                    </Link>
                    <button
                        type="reset"
                        className="btn btn-outline-dark"
                        onClick={() => setUserToEdit({})}
                    >
                        <i className="fa-solid fa-rotate-right pe-2 text-primary"></i>
                        Нулирай
                    </button>
                </div>

            </form >
        </>
    )
}

export default Dashboard;