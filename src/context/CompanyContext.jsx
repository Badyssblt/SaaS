import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';


const CompanyContext = createContext();

export const useCompany = () => {
  return useContext(CompanyContext);
};

export const CompanyProvider = ({ children }) => {
  const [companyData, setCompanyData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchCompany = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/companies/3');
      setCompanyData(response.data);
    } catch (err) {
      if(err.response.data.code === 401){
        navigate('/login');
      }
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <CompanyContext.Provider value={{ companyData, loading, error, fetchCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};
