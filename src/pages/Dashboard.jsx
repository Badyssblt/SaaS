import React, { useEffect, useState } from 'react';
import AsideMenu from '../components/aside/AsideMenu';
import MainDashboard from '../components/dashboard/MainDashboard';
import { CompanyProvider, useCompany } from '../context/CompanyContext';
import EmployeeDashboard from '../components/dashboard/EmployeeDashboard';
import Button from '../components/buttons/Button';
import { isAuthenticated } from '../components/utils/UserUtils';
import { useNavigate } from 'react-router-dom';
import MyAccount from './MyAccount';
import Header from '../components/Header';

function Dashboard() {
  const [content, setContent] = useState('dashboard');

  const isConnected = isAuthenticated();

  const navigate = useNavigate();


  useEffect(() => {
    if(!isConnected){
      navigate('/login');
      return;
    }
  
  }, []);


  return (
    <CompanyProvider>
      <Header style="bg-slate-50"/>
      <div className='flex flex-row'>
      <AsideMenu onClick={setContent} />
      <MainContent content={content} setContent={setContent}/>
      </div>
      
    </CompanyProvider>
  );
}

const MainContent = ({ content, setContent }) => {
  const { companyData, loading, error } = useCompany();


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      {content === 'dashboard' && (
        <MainDashboard content={content} company={companyData} setContent={setContent}>
        </MainDashboard>
      ) || content === "companies" && (<EmployeeDashboard/>) || content === "account" && (<MyAccount/>)}
    </>
  );
};


export default Dashboard;
