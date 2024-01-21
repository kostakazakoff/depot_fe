import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

import Path from "./paths";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import EditProfile from './components/Auth/EditProfile';
import Home from "./components/Home";
import Articles from './components/Articles';
import GetDataFromBackEnd from "./components/GetDataFromBackEnd";
import StoresContext from "./contexts/storesContext";
import ArticlesContext from "./contexts/articlesContext";
import { AuthProvider } from "./contexts/authContext";


function App() {
  return (
    <>
      <AuthProvider>
        <StoresContext.Provider value={GetDataFromBackEnd('stores')}>
          <Navigation />
        </StoresContext.Provider>
        <ArticlesContext.Provider value={GetDataFromBackEnd('articles')}>
          <Routes>
            <Route path={Path.HOME} element={<Home />} />
            <Route path={Path.LOGIN} element={<Login />} />
            <Route path={Path.LOGOUT} element={<Logout />} />
            <Route path={Path.EDIT_PROFILE} element={<EditProfile />} />
            <Route path={Path.ARTICLES} element={<Articles />} />
          </Routes>
        </ArticlesContext.Provider>
      </AuthProvider>
    </>
  );
}

export default App
