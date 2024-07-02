import React, { useEffect, useState } from 'react'
import AsideMenu from '../components/aside/AsideMenu'
import axiosInstance from '../axiosInstance';
import EmployeeCard from '../components/cards/EmployeeCard';
import { CompanyProvider } from '../context/CompanyContext';
import EmployeeModal from '../components/modals/EmployeeModal';
import { useNavigate } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext'

function Employees() {
    const [content, setContent] = useState('dashboard');
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const navigate = useNavigate();


    const getEmployees = async () => {
        try {
            const response = await axiosInstance.get('/api/companies/3');
            setEmployees(response.data);
            
        } catch (error) {
            if(error.response.data.code === 401){
               navigate('/login');
            }
        }
    }



    const handleEmployeeClick = (employee) => {
        setSelectedEmployee(employee);
        setModalIsOpen(true);
      };


    useEffect(() => {
        getEmployees();
    }, []);



  return (
    <CompanyProvider>
      <AsideMenu onClick={setContent} />
      <EmployeeModal employee={selectedEmployee} isOpen={modalIsOpen} setOpen={setModalIsOpen} />
      <div>
        <h2 className='font-bold text-xl p-4'>Mes employés</h2>
        <div className='flex flex-col gap-4 px-6 mb-14'>
            {employees && employees.employees && employees.employees.length !== 0 && employees.employees.map((employee, index) => (
                <EmployeeCard key={index} employee={employee} onClick={() => handleEmployeeClick(employee)} loader={getEmployees}/>
            ))}
            {employees && employees.employees && employees.employees.length == 0 && <p>Vous n'avez aucun employé</p>}
        </div>

        </div>
    </CompanyProvider>

  )
}

export default Employees