import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import AccountNav from '../Components/AccountNav';
import Task from '../Task';


const AccountPage = () => {
  const [redirect, setRedirect] = useState(null)
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile'; 
  }

  async function logout() {
    await axios.post('/logout')
    setRedirect('/')
    setUser(null)
  }


  const { ready, user, setUser } = useContext(UserContext);

  if (!ready) {
    return <div>Loading... </div>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

 

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className='mt-5'>
      {/* <AccountNav/> */}
      <Task/>
      {subpage === 'profile' && (
        
        <div className="text-center w-full p-2 flex items-center justify-center bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
        
        <p className="text-gray-700 font-medium">
          Logged in <span className="text-pink-500 font-semibold">{user.name}</span> ({user.email})
        </p>
        <button
          onClick={logout}
          className="bg-[#F5385D] text-white font-medium m-2 px-5 py-2 rounded-full transition-all duration-300 hover:bg-[#d92648] hover:scale-105 active:scale-95">
          Logout
        </button>
      </div>
  
      
      )}
    </div>
  );
};

export default AccountPage;
