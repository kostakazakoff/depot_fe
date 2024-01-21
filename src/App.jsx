import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./contexts/authContext";
import Navigation from './components/Navigation';

import Path from "./paths";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import EditProfile from './components/Auth/EditProfile';
import Home from "./components/Home";
import Articles from './components/Articles';
import StoresContext from "./contexts/storesContext";
import GetDataFromBackEnd from "./components/GetDataFromBackEnd";


function App() {
  return (
    <>
      <AuthProvider>
        <StoresContext.Provider value={GetDataFromBackEnd('stores')}>
          <Navigation />
        </StoresContext.Provider>
        <Routes>
          <Route path={Path.HOME} element={<Home />} />
          <Route path={Path.LOGIN} element={<Login />} />
          <Route path={Path.LOGOUT} element={<Logout />} />
          <Route path={Path.EDIT_PROFILE} element={<EditProfile />} />
          <Route path={Path.ARTICLES} element={<Articles />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App
