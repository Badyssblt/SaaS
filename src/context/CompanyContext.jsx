import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const CompanyContext = createContext();

export const useCompany = () => {
  return useContext(CompanyContext);
};

export const CompanyProvider = ({ children }) => {
  const [companyData, setCompanyData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [companiesData, setCompaniesData] = useState([]);
  const [companyId, setCompanyId] = useState(Cookies.get('company'));

  const navigate = useNavigate();

  const fetchCompanies = async () => {
    
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/companies/user');
      const companies = response.data;
  
      if(companies.length === 0){
        Cookies.remove("company");
        return;
      }


      if (!Cookies.get('company')) {
        Cookies.set('company', companies[0].id);
        setCompanyId(companies[0].id);
      } else {
        const currentCompanyId = Cookies.get('company');
        const companyExists = companies.some(company => company.id === currentCompanyId);
  
        if (!companyExists) {
          Cookies.set('company', companies[0].id);
          setCompanyId(companies[0].id);
        }
      }
  
      setCompaniesData(companies);
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  };

  const fetchCompany = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/companies/${Cookies.get('company')}`);
      setCompanyData(response.data);
    } catch (err) {
      if (err.response && err.response.data.code === 401) {
        navigate('/login');
      }
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!Cookies.get('token')){
      Cookies.remove('company');
    }
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (companyId) {
      fetchCompany();
    }
  }, [companyId]);

  return (
    <CompanyContext.Provider value={{ companyData, loading, error, fetchCompany, companiesData, fetchCompanies, setCompanyId }}>
      {children}
    </CompanyContext.Provider>
  );
};
