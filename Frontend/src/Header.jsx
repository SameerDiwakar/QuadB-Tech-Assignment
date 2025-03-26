import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";


const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header className='justify-between flex'>
      <Link to={'/'} className='flex items-center gap-1'>
        <span className='font-bold text-xl'>QuadB</span>
      </Link>
      <Link to={user ? '/account' : '/login'} className='flex border border-gray-300 rounded-full py-2 px-4 gap-2 shadow-sm shadow-gray-100 items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <div className="bg-gray-500 text-white rounded-full p-1 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </div>
        {!!user && (
          <div className="">
            {user.name}
          </div>
        )}
      </Link>
    </header>
  )
}

export default Header
