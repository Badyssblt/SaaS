import React from 'react'
import { useCompany } from '../../context/CompanyContext'
import CompanyCard from '../cards/CompanyCard'
import Modals from '../modals/Modals'
import Form from '../Forms/Form'
import Input from '../inputs/Input'
import axiosInstance from '../../axiosInstance'

function EmployeeDashboard() {

  const {companiesData, fetchCompanies, fetchCompany } = useCompany();

  const handleSubmit = async (formData) => {
    try {
      const response = await axiosInstance.post('/api/companies', {
        name: formData.name
      });
      fetchCompanies();
    } catch (error) {
      console.log(error);
    }
  }


  return (


    <div className='bg-slate-50 w-full h-screen'>
    <div>
      <h2 className='font-bold text-xl p-4'>Mes entreprises</h2>
      <Modals styleButton="text-black flex justify-center px-0 text-[#6A6A6A] font-medium" buttonText={<><p>Créer une entreprise</p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </>}>
        <Form onSubmit={handleSubmit}>
          <Input label="Nom de l'entreprise" placeholder="Nom" style="border px-2 rounded-md py-2 focus:outline-none" name="name"/>
        </Form>
      </Modals>
    </div>
      <div className='flex flex-col gap-4 px-4'>
        {companiesData && companiesData.map((company) => (
          <CompanyCard company={company} key={company.id}/>
        ))}
      </div>
    </div>
  )
}

export default EmployeeDashboard