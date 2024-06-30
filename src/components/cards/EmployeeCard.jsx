import React, { useState } from 'react'
import ModalButton from '../buttons/ModalButton'
import Modal from '../modals/Modals'
import Modals from '../modals/Modals'
import Link from '../buttons/Link';
import axiosInstance from '../../axiosInstance';
import Button from '../buttons/Button';
import Form from '../Forms/Form';
import Input from '../inputs/Input';
import { useCompany } from '../../context/CompanyContext';

function EmployeeCard({employee, onClick}) {

  const [employeeData, setEmployeeData] = useState();
  const { fetchCompany } = useCompany();


  const fetchPdf = async (url) => {
    try {
      const response = await axiosInstance.get(url, {
        responseType: 'blob',
      });

      const pdfUrl = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  const handleSubmit = async(formData, setSuccess) => {
    try {
      const response = await axiosInstance.post(`/api/employees/${employee.id}/hours`, {
        hours: formData.hours
      });

      if(response.data.employee){
        setSuccess(true);
        fetchCompany();
      }
    } catch (error) {
      console.log(error);
    }
  } 


  const fireEmployee = async () => {
    try {
      const response = await axiosInstance.delete(`/api/companies/3/employee/${employee.id}`);
      console.log(response);
    } catch (error) {
      
    }
  }


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

  const changeEmployeeInfoSubmit = async (formData, setSuccess) => {
    const updatedFormData = { ...formData };
    
    if (formData.salary !== null && formData.salary !== undefined) {
      updatedFormData.salary = parseFloat(formData.salary);
    }

    if (formData.phone_number !== null && formData.phone_number !== undefined) {
      updatedFormData.phone_number = parseInt(formData.phone_number, 10);
    }

    try {
      const response = await axiosInstance.patch(`/api/companies/3/employee/${employee.id}`, updatedFormData);
      fetchCompany();
    } catch (error) {
      
    }
  }

  return (
    <div className='h-fit bg-white px-10 py-4 rounded-lg shadow flex flex-col gap-2 relative'>
      <div className='absolute right-4'>
        <button onClick={onClick}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
</svg>

        </button>
      </div>
      <div>
        <p className='text-slate-400'>Prénom et nom</p>
        <p className='font-medium'>{employee.firstName + " " + employee.lastName}</p>
      </div>
      <div>
        <p className='text-slate-400'>Email</p>
        <p className='font-medium'>{employee.email}</p>
      </div>
      <div>
        <p className='text-slate-400'>Numéro de téléphone</p>
        <p className='font-medium'>0{employee.phone_number}</p>
      </div>
      <div>
        <p className='text-slate-400'>Poste</p>
        <p className='font-medium'>{employee.job_title}</p>
      </div>
      <div>
        <p className='text-slate-400'>Salaire</p>
        <p className='font-medium'>{employee.salary}€/heure</p>
      </div>
      <div>
        <p className='text-slate-400'>Status</p>
        <p className='font-medium'>{employee.status}</p>
      </div>
      <div>
      <Modals styleButton="primary" route={`/api/employees/${employee.id}/hours`} setData={setEmployeeData} buttonText={<><p>Plus</p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
</svg>
</>}>
          {employeeData && (
            <>
              <div>
                <p className='text-slate-400'>Prénom et nom</p>
                <p className='font-medium'>{employee.firstName + " " + employee.lastName}</p>
              </div>
              <div>
                <p className='text-slate-400'>Poste</p>
                <p className='font-medium'>{employee.job_title}</p>
              </div>
              <div>
                <p className='text-slate-400'>Nombre d'heure aujourd'hui</p>
                <p className='font-medium'>{employeeData.hoursToday}h</p>
              </div>
              <div>
                <p className='text-slate-400'>Nombre d'heure ce mois</p>
                <p className='font-medium'>{employeeData.hoursMonth}h</p>
              </div>
              <div className='mt-4'>
                <Form onSubmit={handleSubmit} successMessage="Les heures ont été enregistré" buttonStyle="mb-2 ml-2" formStyle="flex items-end mb-4" buttonText={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
</svg>
}>
                  <Input name="hours" label="Nombre d'heure aujourd'hui" type="number" placeholder="Nombre d'heure" style="border px-2 rounded-md py-2 focus:outline-none"/>
                </Form>
              </div>
              <div>
                <Button onClick={() => fetchPdf(`http://localhost:8215/api/employees/${employee.id}/payroll`)} style="primary">Générer la fiche de paie</Button>
              </div>
              <Modal styleButton="w-full border mt-2 text-primary border-primary" buttonText="Modifier cet employé" >
                <Form onSubmit={changeEmployeeInfoSubmit}>
                  <Input name="firstName" label="Prénom" placeholder="Entrer le prénom" value={employee.firstName} style="border px-2 rounded-md py-2 focus:outline-none"/>
                  <Input name="lastName" label="Nom" placeholder="Entrer le nom" value={employee.lastName} style="border px-2 rounded-md py-2 focus:outline-none"/>
                  <Input name="birthAt" label="Date de naissance" placeholder="Entrer la date" value={formatDate(employeeData.employee.birth_at)} style="border px-2 rounded-md py-2 focus:outline-none" type="date"/>
                  <Input name="email" label="Email" placeholder="Entrer l'email" value={employeeData.employee.email} style="border px-2 rounded-md py-2 focus:outline-none"/>
                  <Input name="phone_number" label="Numéro de téléphone" placeholder="Entrer le numéro de téléphone" value={employeeData.employee.phone_number} style="border px-2 rounded-md py-2 focus:outline-none"/>
                  <Input name="adress" label="Adresse" placeholder="Entrer l'adresse" value={employeeData.employee.address} style="border px-2 rounded-md py-2 focus:outline-none"/>
                  <Input name="hired_at" label="Date d'embauche" placeholder="Entrer la date d'embauche" value={formatDate(employeeData.employee.hired_at)} style="border px-2 rounded-md py-2 focus:outline-none" type="date"/>
                  <Input name="job_title" label="Poste" placeholder="Entrer le poste" value={employeeData.employee.job_title} style="border px-2 rounded-md py-2 focus:outline-none"/>
                  <Input name="salary" label="Salaire par heure" placeholder="Entrer le salaire" value={employeeData.employee.salary} style="border px-2 rounded-md py-2 focus:outline-none" type="number"/>
                  <Input name="status" label="Status" placeholder="Entrer le status" value={employeeData.employee.status} style="border px-2 rounded-md py-2 focus:outline-none"/>
                </Form>
              </Modal>
              <div>
                <Button onClick={() => fireEmployee()} style="bg-red-800 text-white w-full mt-2">Supprimer cet employé</Button>
              </div>
            </>
          )}
        </Modals>
      </div>

    </div>
  )
}

export default EmployeeCard