import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import AccountNav from '../AccountNav';
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
    <div>
      {/* <AccountNav/> */}
      <Task/>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})
          <button onClick={logout} className='bg-[#F5385D] m-2 max-w-sm mt-2 rounded-full px-4 py-1'>Logout</button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
