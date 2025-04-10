import { createContext, useEffect } from "react";
import React from 'react'; 
import { useState } from "react";
import axios from "axios";



export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [user,setUser] = useState(null);
    const [userID, setUserID] = useState(null); 
    const [ready,setReady] = useState(false);
    useEffect(() => {
      if (!user) {
        axios.get('/profile').then(({data}) => {
          setUser(data);
          setReady(true);
        });
      }
    }, []);
    return (
      <UserContext.Provider value={{user,setUser,userID,setUserID,ready}}>
        {children}
      </UserContext.Provider>
    );
  }