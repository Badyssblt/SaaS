import React, { useState } from 'react'
import DashboardStats from '../cards/DashboardStats'
import MyEmployees from './components/MyEmployees';
import Modal from 'react-modal';
import EmployeeModal from '../modals/EmployeeModal';
import axiosInstance from '../../axiosInstance';
import Modals from '../modals/Modals';
import { useCompany } from '../../context/CompanyContext';
import Cookies from 'js-cookie';
import Button from '../buttons/Button';


function MainDashboard({content, company}) {
  if(Object.keys(company).length == 0){
    return;
  }

  const [companies, setCompanies] = useState([]);
  

  const { companiesData, setCompanyId } = useCompany();

  const employeeCount = company.employees.length;
  const leavesEmployees = company.employees.filter(employee => employee.status === 'Leave');
  const totalSalary = company.employees.reduce((sum, employee) => sum + employee.salary, 0);
  const averageSalary = company.employees.length > 0 ? (totalSalary / company.employees.length) : 0;

  const salary = averageSalary.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const toggleCompany = (companyId) => {
    Cookies.set('company', companyId);
    setCompanyId(companyId);
  }




  // const calculateHoursPerDay = (employees) => {
  //   const hoursPerDay = {};
  
  //   employees.forEach(employee => {
  //     employee.workDays.forEach(workDay => {
  //       const date = new Date(workDay.date).toLocaleDateString();
  //       if (!hoursPerDay[date]) {
  //         hoursPerDay[date] = 0;
  //       }
  //       hoursPerDay[date] += workDay.hours;
  //     });
  //   });
  
  //   return hoursPerDay;
  // };

  const calculateHoursToday = (employees) => {
    const today = new Date().toLocaleDateString();
    let totalHoursToday = 0;
  
    employees.forEach(employee => {
      employee.workDays.forEach(workDay => {
        const date = new Date(workDay.date).toLocaleDateString();
        if (date === today) {
          totalHoursToday += workDay.hours;
        }
      });
    });
  
    return totalHoursToday;
  };

  const companyCookie = Cookies.get('company');

  return (
    <div className='px-6 py-2 bg-slate-50 h-fit mb-12'>
      <div>
        <div>
          <h2 className='font-bold text-xl'>Mon entreprise</h2>
          <div className='flex items-center'>
            <h3 className='text-sm text-slate-400'>{company.name}</h3>
            <Modals buttonText={<><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            </>}>
              <div className='flex flex-col px-4 gap-4'>
              {companiesData && companiesData.map((company) => (
                  
                  <Button  style={companyCookie == company.id ? "primary" : "secondary"} key={company.id} onClick={() => toggleCompany(company.id)}>{company.name}</Button>
              ))}
              </div>

            </Modals>
          </div>

        </div>
        <div className='flex flex-col gap-4 mt-4 items-center'>
          <DashboardStats name="Employés totals" icon="users.svg"  stat={employeeCount}/>
          <DashboardStats name="Employés en congés" icon="arrow-right.svg" stat={leavesEmployees.length} />
          <DashboardStats name="Salaire moyen" icon="euros.svg" stat={salary + " €"} />
          <DashboardStats name="Heures moyennes aujourd'hui" icon="clock.svg" stat={calculateHoursToday(company.employees)} />
        </div>
      </div>
      <MyEmployees company={company} onClick={openModal} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}/>
    </div>
  )
}

export default MainDashboard