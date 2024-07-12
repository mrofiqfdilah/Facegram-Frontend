import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Auth/Register';
import './css/bootstrap.css';
import './css/style.css'
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Userprofile from './pages/Profile/Userprofile';
import Createpost from './pages/Createpost';
import Anotherprofile from './pages/Profile/Anotherprofile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/userprofile/:username',
    element: <Userprofile />
  },
  {
    path: '/createpost',
    element: <Createpost />
  },
  {
    path: '/anotherprofile/:username',
    element: <Anotherprofile />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

