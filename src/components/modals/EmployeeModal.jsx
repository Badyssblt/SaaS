import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import axiosInstance from '../../axiosInstance';
import FormatDate from '../utils/FormatDate';


function EmployeeModal({employee, isOpen, setOpen}) {    
    if(employee == null || Object.keys(employee).length == 0){
        return;
    }

    const [employeeData, setEmployeeData] = useState({});

    const fetchAllData =  async () => {
        try {
            const response = await axiosInstance.get(`/api/employees/${employee.id}`);
            setEmployeeData(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (employee && employee.id) {
          fetchAllData();
        }
      }, []);


      const customStyles = {
        content: {
          marginBottom: '60px'
        },
      };
      
  return (
    <Modal  isOpen={isOpen} style={customStyles}>
        <div className='relative'>
            <button className='absolute right-2' onClick={() => setOpen(false)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            <div className='flex flex-col gap-2'>
                <div>
                    <p className='text-slate-400'>Prénom et nom</p>
                    <p className='font-medium'>{employee.firstName + " " + employee.lastName}</p>
                </div>
                <div>
                    <p className='text-slate-400'>Email</p>
                    <a href={`mailto:${employee.email}`} className='font-medium'>{employee.email}</a>
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
                    <p className='text-slate-400'>Embauché le</p>
                    <p className='font-medium'><FormatDate isoDate={employeeData.hired_at} /></p>
                </div>
                <div>
                    <p className='text-slate-400'>Adresse</p>
                    <p className='font-medium'>{employeeData.address}</p>
                </div>
                <div>
                    <p className='text-slate-400'>Date de naissance</p>
                    <p className='font-medium'><FormatDate isoDate={employeeData.birth_at} /></p>
                </div>
                <div>
                    <p className='text-slate-400'>Date de création de l'employé</p>
                    <p className='font-medium'><FormatDate isoDate={employeeData.created_at} /></p>
                </div>
            </div>
        </div>
        
      </Modal>
  )
}

export default EmployeeModal