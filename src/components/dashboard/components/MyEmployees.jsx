import React, { useState } from 'react';
import EmployeeCard from '../../cards/EmployeeCard';
import EmployeeModal from '../../modals/EmployeeModal';
import Modals from '../../modals/Modals';
import Form from '../../Forms/Form';
import Input from '../../inputs/Input';
import axiosInstance from '../../../axiosInstance';
import { Link } from 'react-router-dom';

function MyEmployees({ company, onClick, modalIsOpen, setIsOpen }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  if (Object.keys(company).length === 0) {
    return null;
  }

  const employeesToShow = company.employees.slice(0, 4);
  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setIsOpen(true);
  };


  const handleSubmit = async (formData, setSuccess) => {
    try {
      const response = await axiosInstance.post('/api/companies/3/employee', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        birth_at: formData.birth_at,
        email: formData.email,
        phone_number: parseInt(formData.phone_number, 10),
        address: formData.address,
        job_title: formData.job_title,
        salary: parseFloat(formData.salary),
        status: formData.status,
        hired_at: formData.hired_at
      });
      if(response.data.id){
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='mt-6'>
      <EmployeeModal employee={selectedEmployee} isOpen={modalIsOpen} setOpen={setIsOpen} />
      <div>
        <div className='flex justify-between items-center'>
          <h2 className='font-bold text-xl'>Mes employés</h2>
          <Link to="/employees">Voir tout</Link>
        </div>

        <Modals styleButton="text-black flex justify-center px-0 text-[#6A6A6A] font-medium" buttonText={<><p>Ajouter un employé</p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        </>}>
          <Form onSubmit={handleSubmit} successMessage="L'employé a bien été crée">
            <Input name="firstName" label="Prénom de l'employé" style="border px-2 rounded-md py-2 focus:outline-none"/>
            <Input name="lastName" label="Nom de l'employé" style="border px-2 rounded-md py-2 focus:outline-none"/>
            <Input name="birth_at" label="Date de naissance" style="border px-2 rounded-md py-2 focus:outline-none" type="date"/>
            <Input name="email" label="Email de l'employé" style="border px-2 rounded-md py-2 focus:outline-none" type="email"/>
            <Input name="phone_number" label="Numéro de téléphone de l'employé" style="border px-2 rounded-md py-2 focus:outline-none" type="tel"/>
            <Input name="address" label="Adresse de l'employé" style="border px-2 rounded-md py-2 focus:outline-none"/>
            <Input name="job_title" label="Intitulé du poste" style="border px-2 rounded-md py-2 focus:outline-none"/>
            <Input name="salary" label="Salaire par heure de l'employé" style="border px-2 rounded-md py-2 focus:outline-none"/>
            <Input name="status" label="Status de l'employé" style="border px-2 rounded-md py-2 focus:outline-none"/>
            <Input name="hired_at" label="Date d'embauche de l'employé" style="border px-2 rounded-md py-2 focus:outline-none" type="date"/>
          </Form>
        </Modals>
      </div>
      <div className='flex flex-col gap-4 mt-4 items-center'>
        {employeesToShow.map((employee, index) => (
          <EmployeeCard key={index} employee={employee} onClick={() => handleEmployeeClick(employee)} />
        ))}
      </div>
    </div>
  );
}

export default MyEmployees;
