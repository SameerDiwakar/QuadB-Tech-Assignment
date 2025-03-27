import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='pt-2 px-6 flex flex-col'>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Layout

