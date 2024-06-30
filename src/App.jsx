import React, { useState } from 'react';
import AsideMenu from './components/aside/AsideMenu';
import MainDashboard from './components/dashboard/MainDashboard';
import { CompanyProvider, useCompany } from './context/CompanyContext';
import Form from './components/Forms/Form'; // Importez le composant Form
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>
  },
  {
    path: "/employees",
    element: <div>Tous les employés</div>
  }
]);


function App() {

  return (
    <RouterProvider router={router}/>
  );
}


export default App;
