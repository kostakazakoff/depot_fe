import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import api from "../../helpers/Api"
import Path from "../../paths";


const Logout = () => {
    const { isAuthenticated, setCredentials } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(`isAuthenticated: ${isAuthenticated}`);

    useEffect(() => {
      if (isAuthenticated) {
        api.post('logout')
        .then(setCredentials({}))
        .then(navigate(Path.HOME))
        .catch(err => console.log(err));
      }
    }, [])
  }
  
  export default Logout;