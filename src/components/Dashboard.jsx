import { useEffect, useState } from "react";
import authStateContext from "../contexts/authContext";
import { useNavigate, Link } from "react-router-dom";
import Path from "../paths"
import api from "../helpers/Api";
import Swal from "sweetalert2";
import moment from "moment";
import StoresStateContext from "../contexts/storesContext";
import Role from "../roles";
import Formats from "../Formats";
import Messages from "../Messages";
import Responsibility from "./Responsibility";
import APIPath from "../apiPaths";


const Dashboard = () => {
    const navigate = useNavigate();
    const { stores, setStores } = StoresStateContext();
    const { superuser, admin, user_id, role } = authStateContext();
    const [users, setUsers] = useState({});
    const [targetUser, setTargetUser] = useState({});
    const [logs, setLogs] = useState({});
    const [filterOptions, setFilterOptions] = useState({});
    const [store, setStore] = useState(stores[0]?.id);
    const [newStoreName, setNewStoreName] = useState('');
    const [responsibilities, setResponsibilities] = useState([]);


    const handleStoreChange = (e) => {
        setStore(e.target.value);
    }


    const handleNewStoreNameInput = (e) => {
        setNewStoreName(e.target.value);
    };


    const deleteStore = () => {
        Swal.fire({
            title: "Сигурни ли сте?",
            text: "Няма да можете да възстановите този склад!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Да, изтрий!",
        })
            .then(result => {
                if (result.isConfirmed) {
                    api.post(`${APIPath.DELETE_STORE}/${store}`)
                        .then(response => response.data)
                        .then(data => handleStoreDeletion(data))
                        .catch(() => navigate(Path.Error404))
                }
            });
    }


    const createNewStore = () => {
        api.post(APIPath.CREATE_STORE, { 'name': newStoreName })
            .then(response => response.data)
            .then(data => handleCreateStoreResponse(data))
            .catch(() => navigate(Path.Error404));
    }


    const getUsersList = () => {
        api.get(APIPath.USERS)
            .then(response => setUsers(response.data.users))
            .catch(() => navigate(Path.Error404));
    }


    const getLogsList = () => {
        api.get(APIPath.LOGS, { params: filterOptions ? filterOptions : '' })
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
        (superuser || admin) && getLogsList();
    }, [filterOptions, stores, users]);


    const handleFilterChange = (e) => {
        setFilterOptions(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }


    const handleTargetUserSelect = (e) => {
        setTargetUser({
            'id': users[e.target.value] ? users[e.target.value].id : null,
            'email': users[e.target.value] ? users[e.target.value].email : '',
            'role': users[e.target.value] ? users[e.target.value].role : '',
            'first_name': users[e.target.value] ? users[e.target.value].profile.first_name : '',
            'last_name': users[e.target.value] ? users[e.target.value].profile.last_name : '',
            'phone': users[e.target.value] ? users[e.target.value].profile.phone : '',
            'responsibilities': users[e.target.value] ? users[e.target.value].stores : '',
        });
    }


    const handleChange = (e) => {
        e.preventDefault();
        setTargetUser(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }


    const EditUser = () => {
        api.post(`dashboard/edit_user/${targetUser.id}`, {
            'id': targetUser.id,
            'email': targetUser.email,
            'role': targetUser.role,
            'first_name': targetUser.first_name,
            'last_name': targetUser.last_name,
            'phone': targetUser.phone,
            'responsibilities': responsibilities
        })
            .then(response => response.data)
            .then(response => handleEditUserResponse(response))
            .catch(() => navigate(Path.Error404));
    }


    const handleEditUserResponse = (response) => {
        if (response.message !== 'success') {
            Swal.fire(
                Messages.UNSUCCESSFUL_OPERATION,
                response.message,
                Messages.ERROR
            )
        } else {
            getUsersList();
            Swal.fire(
                Messages.DONE,
                "Данните на потребителя бяха променени.",
                Messages.SUCCESS
            );
        }
    }


    const editStore = () => {
        api.post(`${APIPath.EDIT_STORE}/${store}`, { 'name': newStoreName })
            .then(response => handleChangeStoreNameResponse(response.data))
            .catch(() => navigate(Path.Error404));
    }


    const deleteUser = () => {
        const id = targetUser.id;
        api.post(`${Path.DELETE_USER}/${id}`)
            .then(response => handleUserDeletionResponse(response.data))
            .catch(() => navigate(Path.Error404));
    }


    const handleChangeStoreNameResponse = (response) => {
        if (response.message !== 'success') {
            let message = [];
            Object.values(response.data).forEach(value => {
                message.push(value);
            });
            Swal.fire(
                Messages.UNSUCCESSFUL_OPERATION,
                message.join(', '),
                Messages.ERROR
            );
        } else {
            api.get(APIPath.STORES)
                .then(response => response.data)
                .then(data => setStores(data))
                .then(Swal.fire(
                    Messages.DONE,
                    "Наименованието на склада беше променено.",
                    Messages.SUCCESS
                ));
            setNewStoreName('');
        }
    }


    const handleCreateStoreResponse = (response) => {
        if (response.message !== 'success') {
            let message = [];
            Object.values(response.data).forEach(value => {
                message.push(value);
            });
            Swal.fire(
                Messages.UNSUCCESSFUL_OPERATION,
                message.join(', '),
                Messages.ERROR
            )
        } else {
            api.get(APIPath.STORES)
                .then(response => response.data)
                .then(data => setStores(data))
                .then(
                    Swal.fire(
                        Messages.DONE,
                        "Създадохте нов склад.",
                        Messages.SUCCESS
                    ));
            setNewStoreName('');
        }
    }


    const handleStoreDeletion = (response) => {
        if (response.message !== 'success') {
            Swal.fire(
                Messages.UNSUCCESSFUL_OPERATION,
                response.message,
                Messages.ERROR
            )
        } else {
            api.get(APIPath.STORES)
                .then(response => response.data)
                .then(data => setStores(data))
                .then(
                    Swal.fire(
                        Messages.DONE,
                        "Складът беше изтрит.",
                        Messages.SUCCESS
                    ));
        }
    }


    const handleUserDeletionResponse = (response) => {
        if (response.message !== 'success') {
            Swal.fire(
                Messages.UNSUCCESSFUL_OPERATION,
                response.message,
                Messages.ERROR
            )
        } else {
            setTargetUser({});
            getUsersList()
            Swal.fire(
                Messages.DONE,
                "Потребителят беше изтрит.",
                Messages.SUCCESS
            )
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
                    deleteUser();
                }
            })
            .catch(() => (navigate(Path.Error404)));
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
                        onChange={handleTargetUserSelect}
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
                        value={targetUser.role}
                        onChange={handleChange}
                        disabled={!targetUser.id}
                        data-bs-theme="light"
                    >
                        <option value={Role.MEMBER}>
                            Без достъп
                        </option>
                        <option value={Role.SUPERUSER}
                            hidden={(targetUser && targetUser.role == Role.SUPERUSER) || role != Role.SUPERUSER}
                        >
                            Главен администратор
                        </option>
                        <option value={Role.ADMIN}
                            hidden={targetUser && targetUser.role == Role.ADMIN}
                        >
                            Администратор
                        </option>
                        <option value={Role.STAFF}
                            hidden={targetUser && targetUser.role == Role.STAFF}
                        >
                            Служител
                        </option>
                    </select>
                </div>

                <div className="input-group d-flex text-secondary">
                    <label className="input-group-text" htmlFor="email">Email</label>
                    <input type="email"
                        id="email"
                        autoComplete="true"
                        className="form-control"
                        aria-describedby="basic-addon1"
                        name="email"
                        value={targetUser && targetUser.email || ''}
                        onChange={handleChange}
                        disabled={!targetUser.id}
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
                        value={targetUser && targetUser.first_name || ''}
                        onChange={handleChange}
                        disabled={!targetUser.id}
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
                        value={targetUser && targetUser.last_name || ''}
                        onChange={handleChange}
                        disabled={!targetUser.id}
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
                        value={targetUser && targetUser.phone || ''}
                        onChange={handleChange}
                        disabled={!targetUser.id}
                    />
                </div>

                <div className="input-group dropdown-center align-self-stretch">
                    <button
                        className="btn btn btn-light dropdown-toggle w-100"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        disabled={
                            !targetUser.id ||
                            targetUser.role != Role.STAFF ||
                            targetUser.role == ''
                        }
                    >
                        Отговорен за склад
                    </button>
                    <div
                        id="responsibilities"
                        name='responsibilities'
                        className="dropdown-menu w-100 shadow"
                    >
                        {stores.map((store) => (
                            <Responsibility
                                key={`responsibility_${store.id}`}
                                store={store}
                                responsibilities={responsibilities}
                                setResponsibilities={setResponsibilities}
                                targetUser={targetUser}
                            />
                        ))}
                    </div>
                </div>

                <div className="d-grid gap-3 mt-4 mb-auto">
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        disabled={!targetUser.id}
                        onClick={EditUser}
                    >
                        <i className="fa-solid fa-floppy-disk pe-2"></i>
                        Запиши
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={HandleUserDeletion}
                        disabled={!targetUser.id}
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
                        setTargetUser({});
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
                            <h5>{moment(logs[key].created_at).format(Formats.DATE_TIME)} ч.</h5>
                            <div style={{ fontSize: '0.85rem' }}>
                                {logs[key].created &&
                                    <p><b>СЪЗДАДЕН: </b>
                                        {logs[key].created}
                                    </p>}
                                {logs[key].updated &&
                                    <p><b>ПРОМЕНЕН: </b>
                                        {logs[key].updated}
                                    </p>}
                                {logs[key].deleted &&
                                    <p><b>ИЗТРИТ: </b>
                                        {logs[key].deleted}
                                    </p>}
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
                            <label className="input-group-text" htmlFor="operation">
                                <i className="fa-solid fa-pen"></i>
                            </label>
                            <select
                                id="operation"
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
                        <label className="input-group-text" htmlFor="store_name">Номер</label>
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
                            Промени номера на склада
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            disabled={!newStoreName}
                            onClick={createNewStore}
                        >
                            <i className="fa-solid fa-square-plus pe-2 text-primary"></i>
                            Създай нов склад с този номер
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={deleteStore}
                        >
                            <i className="fa-solid fa-trash pe-2"></i>
                            Изтрий този склад
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