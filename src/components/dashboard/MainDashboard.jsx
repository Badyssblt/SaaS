import React, { useState } from 'react'
import DashboardStats from '../cards/DashboardStats'
import MyEmployees from './components/MyEmployees';
import Modal from 'react-modal';
import EmployeeModal from '../modals/EmployeeModal';

function MainDashboard({content, company}) {
  if(Object.keys(company).length == 0){
    return;
  }


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


  return (
    <div className='px-6 py-2 bg-slate-50 h-fit mb-12'>
      <div>
        <div>
          <h2 className='font-bold text-xl'>Mon entreprise</h2>
          <h3 className='text-sm text-slate-400'>{company.name}</h3>
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