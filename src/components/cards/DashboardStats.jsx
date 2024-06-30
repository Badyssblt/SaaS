import React from 'react'

function DashboardStats({name, icon, stat}) {
  return (
    <div className='bg-white p-4 rounded-lg shadow flex flex-row justify-between items-center w-64 gap-6 '>
        <div>
            <p className='font-medium text-5xl whitespace-nowrap'>{stat}</p>
            <p>{name}</p>
        </div>
        <div>
            <img src={`/src/assets/icons/${icon}`} alt="" />
        </div>
    </div>
  )
}

export default DashboardStats