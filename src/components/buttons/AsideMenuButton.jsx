import React from 'react'
import { Link } from 'react-router-dom'

function AsideMenuButton({name, onClick, displayName, icon}) {
  return (
    <Link to="/" onClick={() => onClick(name)} className='text-sm flex flex-col items-center font-medium'><img src={`/src/assets/icons/${icon}`} alt="" />{displayName}</Link>
  )
}

export default AsideMenuButton