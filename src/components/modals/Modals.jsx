import React, { useEffect, useState } from 'react'
import ModalButton from '../buttons/ModalButton';
import Modal from 'react-modal';
import axiosInstance from '../../axiosInstance';



/**
 * Create Modals with button open
 * @param {any} {children
 * @param {any} route Must be GET and only one call
 * @param {any} setData set the data to parent
 * @param {any} buttonText Text into open modal button
 * @returns {any}
 */
function Modals({children, route, setData, buttonText, styleButton, open}) {

    const [isOpen, setIsOpen] = useState(false);
   useEffect(() => {
    setIsOpen(open);
   }, [open]);


    const openModal = () => {
      setIsOpen(true);
    }

    const closeModal = () => {
      setIsOpen(false);
    }

    const customStyles = {
      content: {
        marginBottom: '60px'
      },
    };
    

    
    if(route && setData){
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(route);
          setData(response.data);
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(() => {
        fetchData();
      }, [])

    }

  return (
    <div>
        <ModalButton onClick={openModal} style={styleButton}>{buttonText}</ModalButton>
        <Modal isOpen={isOpen} style={customStyles}>
            <button className='absolute right-2' onClick={() => closeModal()}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            <div>
              {children}
            </div>
        </Modal>
    </div>

  )
}

export default Modals