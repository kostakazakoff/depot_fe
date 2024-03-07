import { useContext, useEffect, useState } from "react";
import authContext from "../contexts/authContext";
import { useNavigate, Link } from "react-router-dom";
import Path from "../paths"
import api from "../helpers/Api";
import Swal from "sweetalert2";
import moment from "moment";


const Dashboard = () => {
    const { admin, user_id } = useContext(authContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState({});
    const [userToEdit, setUserToEdit] = useState({});
    const [logs, setLogs] = useState({});
    const [filterOptions, setFilterOptions] = useState({});

    const getUsersList = () => {
        api.get('dashboard/users_list')
            .then(response => setUsers(response.data.users))
            .catch(() => navigate(Path.Error404));
    }

    const getLogsList = () => {
        api.get('logs/list', { params: filterOptions ? filterOptions : '' })
            .then(response => {
                response.data.message === 'success'
                    ? setLogs(response.data.logs)
                    : setLogs([]);
            })
            .catch(() => navigate(Path.Error404));
    }

    useEffect(() => {
        !admin && navigate(Path.HOME);
        getUsersList();
        getLogsList();
    }, []);

    useEffect(() => {
        getLogsList();
    }, [filterOptions]);

    const handleFilterChange = (e) => {
        setFilterOptions(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

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
            .catch(() => navigate(Path.Error404));
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

    // useEffect(() => {
    //     Object.values(users).forEach(user => {
    //         console.log(user);
    //     })
    // }, [users]);

    // useEffect(() => {
    //     Object.keys(userToEdit).forEach(k => console.log(k, userToEdit[k]));
    // }, [userToEdit]);

    return (
        <div className="position-relative w-100 d-flex flex-row flex-wrap gap-5 justify-content-evenly align-items-center p-5">
            <form
                className="position-relative mx-auto p-5 rounded-2 shadow-lg w-25 mh-75"
                style={{ minWidth: '500px', height: '700px' }}
                onSubmit={SubmitHandler}
            >
                <h4
                    className="py-1 px-4 text-primary position-absolute bg-light border border-1 border-dark rounded shadow"
                    style={{ top: '-24px', left: '50%', transform: 'translate(-50%, 0)' }}>
                    ПОТРЕБИТЕЛИ
                </h4>

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

            </form>

            <form
                className="position-relative mx-auto px-4 py-5 rounded-2 shadow-lg w-25 mh-75 p-3"
                style={{ minWidth: '500px', height: '700px' }}
                onSubmit={SubmitHandler}
            >
                <h4
                    className="py-1 px-4 text-primary position-absolute bg-light border border-1 border-dark rounded shadow"
                    style={{ top: '-24px', left: '50%', transform: 'translate(-50%, 0)' }}
                >
                    ИСТОРИЯ
                </h4>

                <ul
                    className="overflow-y-auto p-4 d-flex flex-column gap-3"
                    style={{ height: '70%', listStyleType: 'none' }}
                >
                    {logs && Object.keys(logs).map(key => (
                        <li
                            key={key}
                            value={key}
                            className="px-3 pt-3 rounded rounded-2 bg-warning shadow"
                        >
                            <h4>{moment(logs[key].created_at).format('DD/MM/YYYY')}</h4>
                            <p>
                                {logs[key].created &&
                                    <p><b>СЪЗДАДЕН: </b>{logs[key].created}</p>}
                                {logs[key].updated &&
                                    <p><b>ПРОМЕНЕН: </b>{logs[key].updated}</p>}
                                {logs[key].deleted &&
                                    <p><b>ИЗТРИТ: </b>{logs[key].deleted}</p>}
                            </p>
                        </li>
                    ))}
                </ul>

                <div className="d-flex flex-row px-4 gap-2 mb-3">
                    <div className="input-group">
                        <label className="input-group-text" id="basic-addon2" htmlFor="from_date">
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </label>
                        <input
                            id='from_date'
                            type="date"
                            className="form-control"
                            aria-describedby="basic-addon2"
                            name='from_date'
                            value={filterOptions.from_date}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-group-text" id="basic-addon2" htmlFor="to_date">
                            <i className="fa-solid fa-right-to-bracket"></i>
                        </label>
                        <input
                            id='to_date'
                            type="date"
                            className="form-control"
                            aria-describedby="basic-addon2"
                            name='to_date'
                            value={filterOptions.to_date}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>

                <div className="input-group mb-3 px-4 dropdown">
                    <label className="input-group-text" htmlFor="user">Персонал</label>
                    <select
                        id="user"
                        name="user"
                        className="form-select"
                        onChange={handleFilterChange}
                    >
                        <option value="">Избери потребител</option>
                        <option value={user_id}>Аз</option>
                        {users && Object.keys(users).map(key => (
                            <option key={key} value={users[key].id}>
                                {users[key].profile.first_name
                                    ? users[key].profile.first_name
                                    : users[key].email
                                }
                            </option>
                        ))}
                    </select>
                </div>

                {/* <div className="input-group mb-3 px-4">
                    <label className="input-group-text" id="basic-addon2" htmlFor="description">Описание:</label>
                    <input
                        id='description'
                        type="text"
                        className="form-control"
                        aria-describedby="basic-addon2"
                        name='description'
                        value={filterOptions.description}
                        onChange={handleFilterChange}
                    />
                </div> */}

                {/* <button
                    type="reset"
                    className="btn text-primary"
                    onClick={() => { setFilterOptions([]) }}
                >
                    <i className='fa-solid fa-rotate-right'></i>
                </button> */}
            </form>

            <form
                className="position-relative mx-auto p-5 rounded-2 shadow-lg w-25 mh-75"
                style={{ minWidth: '500px', height: '700px' }}
                onSubmit={SubmitHandler}
            >
                <h4
                    className="py-1 px-4 text-primary position-absolute bg-light border border-1 border-dark rounded shadow"
                    style={{ top: '-24px', left: '50%', transform: 'translate(-50%, 0)' }}>
                    СКЛАДОВЕ
                </h4>
            </form>

        </div>
    )
}

export default Dashboard;