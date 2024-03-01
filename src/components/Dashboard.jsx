import { useContext, useEffect, useState } from "react";
import authContext from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Path from "../paths"
import api from "../helpers/Api";


const Dashboard = () => {
    const { admin } = useContext(authContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState({});
    const [userToEdit, setUserToEdit] = useState({});

    useEffect(() => {
        !admin && navigate(Path.HOME);
        api.get('dashboard/users_list')
            .then(response => setUsers(response.data.users))
            .catch(err => console.log(err));
    }, []);

    const handleUserToEditSelect = (e) => {
        setUserToEdit({
            'id': users[e.target.value].id,
            'email': users[e.target.value].email,
            'role': users[e.target.value].role,
            'first_name': users[e.target.value].profile.first_name,
            'last_name': users[e.target.value].profile.last_name,
            'phone': users[e.target.value].profile.phone
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
                <h4 className="text-primary text-center">
                    {userToEdit && userToEdit.name || userToEdit.email}
                </h4>

                <p className="mb-4 text-primary text-center">
                    Роля: {userToEdit && userToEdit.role}
                </p>

                <div className="input-group mb-3 shadow dropdown">
                    <span className="input-group-text">Персонал:</span>
                    <select
                        id="user"
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
                    <span className="input-group-text">Роля:</span>
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
                        <option value='superuser' hidden={userToEdit.role == 'superuser'}>
                            Superuser
                        </option>
                        <option value='admin' hidden={userToEdit.role == 'admin'}>
                            Администратор
                        </option>
                        <option value='staff' hidden={userToEdit.role == 'staff'}>
                            Персонал
                        </option>
                    </select>
                </div>

                <div className="input-group mb-2 d-flex text-secondary">
                    <span className="input-group-text" id="email"><i className="fa-solid fa-at"></i></span>
                    <input type="email"
                        autoComplete="true"
                        className="form-control"
                        placeholder="Електронна поща"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        name="email"
                        value={userToEdit && userToEdit.email || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="d-grid gap-2 mb-4">
                    <button type="submit" className="btn btn-outline-primary">Потвърди</button>
                </div>
            </form>
        </>
    )
}

export default Dashboard;