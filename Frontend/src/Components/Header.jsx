import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../UserContext.jsx";


const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header className="flex border-b justify-between items-center shadow-sm rounded-full px-4 py-2 transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-pink-700 group">
      <Link to={'/'} className="flex items-center gap-1 text-white hover:scale-105 transition-transform duration-300">
        <span className="font-bold text-2xl text-pink-600 group-hover:text-white">
          QuadB
        </span>
      </Link>
      <Link
        to={user ? '/account' : '/login'}
        className="flex items-center border border-pink-500 rounded-full py-2 px-4 gap-2 shadow-sm bg-white hover:bg-pink-100 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
       
        <div className="bg-pink-600 text-white rounded-full p-1 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </div>
        {!!user && (
          <div className="text-pink-600 font-medium">
            {user.name}
          </div>
        )}
      </Link>
    </header>
  )
}

export default Header
