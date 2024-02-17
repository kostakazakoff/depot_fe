import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

import Path from "./paths";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import EditProfile from './components/Auth/EditProfile';
import Home from "./components/Home";
import Articles from './components/articles/Articles';
import Store from './components/Store';

import { AuthProvider } from "./contexts/authContext";
import { StoresProvider } from "./contexts/storesContext";
// import ArticlesContext from "./contexts/articlesContext";


function App() {
  return (
    <>
      <AuthProvider>
        <StoresProvider>
          <Navigation />
        {/* <ArticlesContext.Provider value={GetDataFromBackEnd('articles')}> */}
        <Routes>
          <Route path={Path.HOME} element={<Home />} />
          <Route path={Path.LOGIN} element={<Login />} />
          <Route path={Path.LOGOUT} element={<Logout />} />
          <Route path={Path.EDIT_PROFILE} element={<EditProfile />} />
          <Route path={Path.ARTICLES} element={<Articles />} />
          <Route path={Path.STORE} element={<Store />} />
        </Routes>
        {/* </ArticlesContext.Provider> */}
        </StoresProvider>
      </AuthProvider>
    </>
  );
}

export default App
