import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Header({ style }) {

    const [isToggle, setToggle] = useState(false);

    const toggleMenu = () => {
        setToggle(!isToggle);
    }


  return (
    <div className={style}>
        <menu className=''>
            <div className='flex justify-between py-4 px-4'>
                <li><Link to="/home" className='font-bold text-xl'>Employefy</Link></li>
                
                {!isToggle && (<button className='z-50' onClick={toggleMenu}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                </button>)}
            </div>
            {isToggle && (<div className='fixed w-full h-screen px-0 top-0 z-50' style={{ background: 'rgba(255, 255, 255)' }}>
                <div className='flex flex-col relative h-full'>
                    <button onClick={toggleMenu} className='absolute right-4 top-4'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div>
                        <div className='mt-4 ml-4'>
                            <li><Link to="/home" className='font-bold text-xl'>Employefy</Link></li>
                        </div>
                        <div className='flex flex-col font-bold p-4'>
                            <li className='w-full py-2 border-b'><Link to="/about">
                            <div className='flex items-center justify-between'>
                                <span>A propos</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            </Link></li>
                            <li className='w-full py-2 border-b'><Link to="/features">
                            <div className='flex items-center justify-between'>
                                <span>Fonctionnalités</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            </Link></li>
                            <li className='w-full py-2 border-b'><Link to="/contact">
                            <div className='flex items-center justify-between'>
                                <span>Contact</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            </Link></li>
                            <div className='flex justify-center mt-6'>
                                <Link to="/" className='rounded-full border border-primary text-primary px-8 py-2'>Dashboard</Link>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
                
            </div>)}
            
            
        </menu>
    </div>
  )
}

export default Header