import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthStateContext from "../../contexts/authContext";
import api from "../../helpers/Api"
import Path from "../../paths";
import StoresContext from "../../contexts/storesContext";


const Logout = () => {
    const { isAuthenticated, setCredentials } = AuthStateContext();
    const {setStores} = useContext(StoresContext);
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