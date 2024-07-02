import React, { useEffect, useState } from 'react';
import AsideMenu from '../components/aside/AsideMenu';
import MainDashboard from '../components/dashboard/MainDashboard';
import { CompanyProvider, useCompany } from '../context/CompanyContext';
import EmployeeDashboard from '../components/dashboard/EmployeeDashboard';
import Button from '../components/buttons/Button';
import { isAuthenticated } from '../components/utils/UserUtils';
import { useNavigate } from 'react-router-dom';
import MyAccount from './MyAccount';

function Dashboard() {
  const [content, setContent] = useState('dashboard');

  const isConnected = isAuthenticated();

  const navigate = useNavigate();


  useEffect(() => {
    if(!isConnected){
      navigate('/login');
      return;
    }
  
  }, [])

  return (
    <CompanyProvider>

      <AsideMenu onClick={setContent} />
      <MainContent content={content} />
    </CompanyProvider>
  );
}

const MainContent = ({ content }) => {
  const { companyData, loading, error } = useCompany();
  if(Object.keys(companyData).length === 0){
    return (
    <div className='px-4 mt-8'>
      <p className='font-bold text-center'>Vous n'avez aucune entreprise</p>
      <Button style="primary">Commencer par créer une entreprise</Button>
    </div>)
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {content === 'dashboard' && (
        <MainDashboard content={content} company={companyData}>
        </MainDashboard>
      ) || content === "companies" && (<EmployeeDashboard/>) || content === "account" && (<MyAccount/>)}
    </>
  );
};


export default Dashboard;
