import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthStateContext from "../../contexts/authContext";
import api from "../../helpers/Api"
import Path from "../../paths";
import StoresStateContext from "../../contexts/storesContext";


const Logout = () => {
    const { isAuthenticated, setCredentials } = AuthStateContext();
    const {setStores} = StoresStateContext();
    const navigate = useNavigate();
    console.log(`isAuthenticated: ${isAuthenticated}`);

    useEffect(() => {
      if (isAuthenticated) {
        api.post('logout')
        .then(setCredentials({}))
        .then(setStores({}))
        .then(navigate(Path.HOME))
        .catch(err => console.log(err));
      }
    }, [])
  }
  
  export default Logout;