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
        setUserToEdit(state => ({
            ...state,
            ...e.target.value
        }));
    }

    const handleChange = (e) => {
        // 
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
        console.log(`User to edit: ${userToEdit}`);
    }, [userToEdit]);



    return (
        <>
            <form
                className="container-xs vertical-center position-absolute top-50 start-50 translate-middle p-5 bg-white rounded-4 shadow-lg z-3 w-25"
                style={{ minWidth: '500px' }}
                onSubmit={SubmitHandler}
            >


                <div className="input-group mb-3 shadow dropdown">
                    <span className="input-group-text">Персонал:</span>
                    <select
                        id="user"
                        className="form-select"
                        value={userToEdit || userToEdit}
                        onChange={handleUserToEditSelect}
                    >
                        <option value="">Избери потребител</option>
                        {users && Object.values(users).map(user => (
                            <option key={user.id} value={user}>
                                {user.profile.first_name
                                ?user.profile.first_name
                                :user.email
                            }
                            </option>
                        ))}
                    </select>
                </div>

                <div className="d-grid gap-2 mb-4">
                    <button type="submit" className="btn btn-outline-primary">Потвърди</button>
                </div>
            </form>
        </>
    )
}

export default Dashboard;