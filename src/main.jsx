import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Dashboard from './pages/Dashboard.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.jsx';
import Employees from './pages/Employees.jsx';
import Login from './pages/Login.jsx';
import HomePage from './pages/HomePage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/employees",
    element: <Employees/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: '/home',
    element: <HomePage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
