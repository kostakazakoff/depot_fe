import { useContext, useEffect, useRef, useState } from "react";
import authContext from "../contexts/authContext";
import { useNavigate, Link } from "react-router-dom";
import Path from "../paths"
import api from "../helpers/Api";
import Swal from "sweetalert2";
import moment from "moment";
import StoresContext from "../contexts/storesContext";
import Role from "../roles";


const Dashboard = () => {
    const { admin, user_id, role } = useContext(authContext);
    const { stores, setStores } = useContext(StoresContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState({});
    const [userToEdit, setUserToEdit] = useState({});
    const [logs, setLogs] = useState({});
    const [filterOptions, setFilterOptions] = useState({});
    const [store, setStore] = useState(stores[0].id);
    const [newStoreName, setNewStoreName] = useState(store.name);
    const [responsibilities, setResponsibilities] = useState([]);
    const [responsibilitiesToDetach, setResponsibilitiesToDetach] = useState([]);


    const handleResponsibilitiesSelection = (e) => {
        if (e.target.checked) {

            !responsibilities.includes(parseInt(e.target.value)) &&
                setResponsibilities(state => [
                    ...state,
                    e.target.value,
                ]);

            setResponsibilitiesToDetach(state => state.filter(
                value => value != e.target.value
            ));
        } else {

            setResponsibilities(state => state.filter(
                value => value != e.target.value
            ));

            setResponsibilitiesToDetach(state => [
                ...state,
                e.target.value
            ]);
        }
    }

    const handleResponsibilitiesSubmit = () => {
        if (responsibilities.length > 0) {
            api.post(`${Path.ATTACH_RESPONSIBILITIES}/${userToEdit.id}`, responsibilities)
                .then(response => response.data.user)
                .then(() => getUsersList())
                .then(() => setResponsibilities([]))
                .catch(() => navigate(Path.Error404));
        }
        if (responsibilitiesToDetach.length > 0) {
            api.post(`${Path.DETACH_RESPONSIBILITIES}/${userToEdit.id}`, responsibilitiesToDetach)
                .then(response => console.log(response))
                .then(() => getUsersList())
                .then(() => setResponsibilitiesToDetach([]))
                .catch(() => navigate(Path.Error404));
        }
    }

    useEffect(() => {
        console.log(`Attach responsibilities ${responsibilities} to ${userToEdit.email}`)
    }, [responsibilities]);
    useEffect(() => { console.log(`Detach responsibilities ${responsibilitiesToDetach} from ${userToEdit.email}`) }, [responsibilities]);

    const handleStoreChange = (e) => {
        setStore(e.target.value);
    }

    const handleNewStoreNameInput = (e) => {
        setNewStoreName(e.target.value);
    };

    const deleteStore = () => {
        // TODO: Delete the store
        console.log(`Store ${store} deleted`);
    }

    const createNewStore = () => {
        console.log(`Creating ${newStoreName}`);
    }

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
        const userStores = users[e.target.value]?.stores;

        userStores?.forEach(store => {
            setResponsibilities(state => ([
                ...state,
                store.responsibilities.store_id
            ]));
        })

        setUserToEdit({
            'id': users[e.target.value] ? users[e.target.value].id : '',
            'email': users[e.target.value] ? users[e.target.value].email : '',
            'role': users[e.target.value] ? users[e.target.value].role : '',
            'first_name': users[e.target.value] ? users[e.target.value].profile.first_name : '',
            'last_name': users[e.target.value] ? users[e.target.value].profile.last_name : '',
            'phone': users[e.target.value] ? users[e.target.value].profile.phone : '',
            'responsibilities': users[e.target.value] ? responsibilities : '',
        });
    }

    const handleChange = (e) => {
        setUserToEdit(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const EditUser = () => {
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

    const editStore = (e) => {
        e.preventDefault();
        // TODO: update Store
        console.log(`Edit ${newStoreName}, id: ${store}`);
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

    return (
        <div className="position-relative w-100 d-flex flex-row flex-wrap gap-5 justify-content-evenly align-items-center p-5">
            <form
                className="position-relative mx-auto p-5 rounded-2 shadow-lg w-25 mh-75 d-flex flex-column gap-3"
                style={{ minWidth: '500px', height: '700px' }}
            >
                <h4
                    className="py-1 px-4 text-light position-absolute rounded shadow"
                    style={{ top: '-24px', left: '50%', transform: 'translate(-50%, 0)' }}>
                    ПОТРЕБИТЕЛИ
                </h4>

                <div className="input-group dropdown">
                    <label className="input-group-text" htmlFor="user">Служител</label>
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

                <div className="input-group dropdown">
                    <label className="input-group-text" htmlFor="role">Роля</label>
                    <select
                        id="role"
                        name='role'
                        className="form-select"
                        value={userToEdit.role}
                        onChange={handleChange}
                    >
                        <option value={Role.MEMBER}>
                            Без достъп
                        </option>
                        <option value={Role.SUPERUSER} hidden={userToEdit && userToEdit.role == Role.SUPERUSER}>
                            Главен администратор
                        </option>
                        <option value={Role.ADMIN} hidden={userToEdit && userToEdit.role == Role.ADMIN}>
                            Администратор
                        </option>
                        <option value={Role.STAFF} hidden={userToEdit && userToEdit.role == Role.STAFF}>
                            Служител
                        </option>
                    </select>
                </div>

                <div
                    className="input-group dropdown"
                >
                    <button
                        type="button"
                        className="btn btn-outline-light bg-light text-dark dropdown-toggle w-100"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        disabled={!Object.keys(userToEdit).length || userToEdit.role === Role.MEMBER}
                        data-bs-auto-close="outside"
                    >
                        Отговорен за склад
                    </button>
                    <div
                        className="dropdown-menu p-4 w-100"
                    >
                        {stores.map((store) => (
                            <div
                                className="form-check p-0 mb-2"
                                key={`responsibility_${store.id}`}
                            >
                                <input
                                    type="checkbox"
                                    className="btn-check"
                                    id={`responsibility_${store.id}`}
                                    autoComplete="off"
                                    value={store.id}
                                    // checked={responsibilities.includes(store.id)}
                                    onChange={handleResponsibilitiesSelection}
                                />
                                <label
                                    className="btn btn-outline-dark w-100 text-primary"
                                    htmlFor={`responsibility_${store.id}`}
                                >
                                    {store.name}
                                </label>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-primary mt-3 w-100"
                            onClick={() => handleResponsibilitiesSubmit()}
                        >Запази
                        </button>
                    </div>
                </div>

                <div className="input-group d-flex text-secondary">
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

                <div className="input-group d-flex text-secondary">
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

                <div className="input-group d-flex text-secondary">
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

                <div className="input-group d-flex text-secondary">
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

                <div className="d-grid gap-3 mt-4 mb-auto">
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        disabled={!userToEdit.id}
                        onClick={EditUser}
                    >
                        <i className="fa-solid fa-floppy-disk pe-2"></i>
                        Запиши
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={HandleUserDeletion}
                        disabled={!userToEdit.id}
                    >
                        <i className="fa-solid fa-trash pe-2"></i>
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
                </div>
                <button
                    type="reset"
                    className="btn btn-primary"
                    onClick={() => {
                        // setUserToEdit({});
                        setResponsibilities([]);
                        setResponsibilitiesToDetach([]);
                    }}
                >
                    <i className="fa-solid fa-rotate-right pe-2"></i>
                    Нулирай
                </button>

            </form>

            <div
                className="position-relative mx-auto px-4 py-5 rounded-2 shadow-lg w-25 mh-75 p-3 d-flex flex-column align-items-strech"
                style={{ minWidth: '500px', height: '700px' }}
            >
                <h4
                    className="py-1 px-4 text-light position-absolute rounded shadow"
                    style={{ top: '-24px', left: '50%', transform: 'translate(-50%, 0)' }}
                >
                    ИСТОРИЯ
                </h4>

                <ul
                    className="overflow-y-auto p-4 d-flex flex-column mb-auto"
                    style={{ height: '64%', listStyleType: 'none' }}
                >
                    {logs && Object.keys(logs).map(key => (
                        <li
                            key={key}
                            value={key}
                            className="px-3 pt-3 rounded rounded-2 shadow border-bottom border-bottom-light"
                        >
                            <h5>{moment(logs[key].created_at).format('DD/MM/YYYY - HH:MM')} ч.</h5>
                            <div style={{ fontSize: '0.85rem' }}>
                                {logs[key].created &&
                                    <p><b>СЪЗДАДЕН: </b>{logs[key].created}</p>}
                                {logs[key].updated &&
                                    <p><b>ПРОМЕНЕН: </b>{logs[key].updated}</p>}
                                {logs[key].deleted &&
                                    <p><b>ИЗТРИТ: </b>{logs[key].deleted}</p>}
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="d-flex flex-column gap-3 align-items-strech px-4">
                    <div className="d-flex flex-row gap-2">
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

                    <div className="d-flex flex-row gap-2">
                        <div className="input-group dropdown">
                            <label className="input-group-text" htmlFor="user">
                                <i className="fa-solid fa-user"></i>
                            </label>
                            <select
                                id="user"
                                name="user"
                                className="form-select"
                                onChange={handleFilterChange}
                            >
                                <option value="">Потребител</option>
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

                        <div className="input-group dropdown">
                            <label className="input-group-text" htmlFor="user">
                                <i className="fa-solid fa-pen"></i>
                            </label>
                            <select
                                id="user"
                                name="operation"
                                className="form-select"
                                onChange={handleFilterChange}
                            >
                                <option value="">Събитие</option>
                                <option value='created'>Създаден</option>
                                <option value='updated'>Променен</option>
                                <option value='deleted'>Изтрит</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group">
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
                    </div>

                    <button
                        type="reset"
                        className="btn btn-primary"
                        onClick={() => setFilterOptions([])}
                    >
                        <i className="fa-solid fa-rotate-right pe-2"></i>
                        Нулирай
                    </button>
                </div>

            </div>

            {role === Role.SUPERUSER &&
                <section
                    className="position-relative mx-auto p-5 rounded-2 shadow-lg w-25 mh-75 d-flex flex-column gap-3"
                    style={{ minWidth: '500px', height: '700px' }}
                >
                    <h4
                        className="py-1 px-4 text-light position-absolute rounded shadow"
                        style={{ top: '-24px', left: '50%', transform: 'translate(-50%, 0)' }}>
                        СКЛАДОВЕ
                    </h4>

                    {/* TODO: */}
                    <div className="input-group dropdown">
                        <span className="input-group-text">Склад:</span>
                        <select
                            id="storeSelect"
                            className="form-select"
                            name="store"
                            onChange={handleStoreChange}
                        >
                            {stores.map((store) => (
                                <option key={store.id} value={store.id}>
                                    {store.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group mb-3 d-flex text-secondary">
                        <label className="input-group-text" htmlFor="store_name">Ново име на склада</label>
                        <input type="text"
                            id="store_name"
                            autoComplete="true"
                            className="form-control"
                            aria-describedby="basic-addon1"
                            name="store_name"
                            value={newStoreName}
                            onChange={handleNewStoreNameInput}
                        />
                    </div>

                    <div className="d-grid gap-3 mb-auto">
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            disabled={!newStoreName}
                            onClick={editStore}
                        >
                            <i className="fa-solid fa-pen-to-square pe-2"></i>
                            Промени името на склада
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={deleteStore}
                        >
                            <i className="fa-solid fa-trash pe-2"></i>
                            Изтрий този склад
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            disabled={!newStoreName}
                            onClick={createNewStore}
                        >
                            <i className="fa-solid fa-square-plus pe-2 text-primary"></i>
                            Създай нов склад
                        </button>
                    </div>
                    <button
                        type="reset"
                        className="btn btn-primary"
                        onClick={() => setNewStoreName('')}
                    >
                        <i className="fa-solid fa-rotate-right pe-2"></i>
                        Нулирай
                    </button>
                </section>
            }

        </div>
    )
}

export default Dashboard;