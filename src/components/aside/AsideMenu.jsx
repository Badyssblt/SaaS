import React, { useState } from 'react'
import AsideMenuButton from '../buttons/AsideMenuButton'

function AsideMenu({onClick}) {



  return (
    <div className='flex flex-row justify-between gap-6 px-6 py-2 bg-white fixed bottom-0 w-full border-t-2 z-50'>
        <AsideMenuButton name="dashboard" onClick={onClick} displayName="Mon entreprise" icon="company.svg"/>
        <AsideMenuButton name="companies" onClick={onClick} displayName="Mes entreprises" icon="companies.svg"/>
        <AsideMenuButton name="account" onClick={onClick} displayName="Mon compte" icon='user.svg'/>
    </div>
  )
}

export default AsideMenu