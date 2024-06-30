import React, { useState } from 'react';
import AsideMenu from '../components/aside/AsideMenu';
import MainDashboard from '../components/dashboard/MainDashboard';
import { CompanyProvider, useCompany } from '../context/CompanyContext';

function Dashboard() {
  const [content, setContent] = useState('dashboard');

  return (
    <CompanyProvider>
      <AsideMenu onClick={setContent} />
      <MainContent content={content} />
    </CompanyProvider>
  );
}

const MainContent = ({ content }) => {
  const { companyData, loading, error } = useCompany();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {content === 'dashboard' && (
        <MainDashboard content={content} company={companyData}>
        </MainDashboard>
      )}
    </>
  );
};


export default Dashboard;
