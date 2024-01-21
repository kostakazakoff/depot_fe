import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import api from "../../helpers/Api"

const Logout = () => {
    const { setCredentials } = useContext(AuthContext);
    const navigate = useNavigate();
  
    useEffect(() => {
      api.post('logout')
      .then(setCredentials({}))
      .then(navigate('/login'))
      .catch(err => console.log(err));
    }, [])
  }
  
  export default Logout;