import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

import Path from "./paths";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import EditProfile from './components/Auth/EditProfile';
import Home from "./components/Home";
import Articles from './components/Articles';
import GetDataFromBackEnd from "./components/GetDataFromBackEnd";
import Store from './components/Store';

import { AuthProvider } from "./contexts/authContext";
import StoresContext from "./contexts/storesContext";
// import ArticlesContext from "./contexts/articlesContext";


function App() {
  return (
    <>
      {/* <img src="https://www.rowse.co.uk/static/images/blog/posts/open-graph/what-is-the-digital-railway-open-graph.jpg"
        alt="" className="img-fluid position-fixed top-0 start-0 z-n1" /> */}
      <AuthProvider>
        <StoresContext.Provider value={GetDataFromBackEnd('stores')}>
          <Navigation />
        </StoresContext.Provider>
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
      </AuthProvider>
    </>
  );
}

export default App
