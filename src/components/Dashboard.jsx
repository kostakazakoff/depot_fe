import { useContext, useEffect, useState } from "react";
import authContext from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Path from "../paths"


const Dashboard = () => {
    const { admin } = useContext(authContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState();

    useEffect(() => {
        !admin
            && navigate(Path.HOME);
    }, [admin]);

    return (
        <p className="mt-5">Dashboard</p>
    )
}

export default Dashboard;