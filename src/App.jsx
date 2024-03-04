import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

import Path from "./paths";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import EditProfile from './components/Auth/EditProfile';
import Register from './components/Auth/Register';
import Home from "./components/Home";
import Articles from './components/Articles';
import AddArticle from './components/AddArticle';
import EditArticle from './components/EditArticle';
import ImagesPreview from './components/ImagesPreview';

import { AuthProvider } from "./contexts/authContext";
import { StoresProvider } from "./contexts/storesContext";
import Dashboard from './components/Dashboard';
import Error404 from './components/Error404';

// TODO: HISTORY LOGS!!!
function App() {
  return (
    <>
      <AuthProvider>
          <StoresProvider>
            <Navigation />
            <Routes>
              <Route path={Path.HOME} element={<Home />} />
              <Route path={Path.LOGIN} element={<Login />} />
              <Route path={Path.LOGOUT} element={<Logout />} />
              <Route path={Path.REGISTER} element={<Register />} />
              <Route path={Path.EDIT_PROFILE} element={<EditProfile />} />
              <Route path={Path.ARTICLES} element={<Articles />} />
              <Route path={Path.EDIT_ARTICLE} element={<EditArticle />} />
              <Route path={Path.ADD_ARTICLE} element={<AddArticle />} />
              <Route path={Path.IMAGES_PREVIEW} element={<ImagesPreview />} />
              <Route path={Path.DASHBOARD} element={<Dashboard />} />
              <Route path={Path.Error404} element={<Error404 />} />
            </Routes>
          </StoresProvider>
      </AuthProvider>
    </>
  );
}

export default App
