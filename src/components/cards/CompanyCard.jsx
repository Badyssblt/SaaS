import React from 'react'
import Button from '../buttons/Button'
import axiosInstance from '../../axiosInstance';
import { useCompany } from '../../context/CompanyContext';


function CompanyCard({company}) {

    const { fetchCompanies } = useCompany();

    const deleteCompany = async () => {
        try {
            const response = await axiosInstance.delete(`/api/companies/${company.id}`);
            fetchCompanies();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='h-fit bg-white px-10 py-4 rounded-lg shadow flex flex-col gap-2 relative'>
        <h3>{company.name}</h3>
        <Button style="bg-red-800 rounded-md px-4 py-2 text-white" onClick={deleteCompany}>Supprimer cette entreprise</Button>
    </div>
  )
}

export default CompanyCard