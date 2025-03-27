import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IndexPage from './Pages/IndexPage'
import LoginPage from './Pages/LoginPage'
import Layout from './Components/Layout'
import RegisterPage from './Pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AccountPage from './Pages/AccountPage'
axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={< LoginPage />} />
        <Route path='/register' element={< RegisterPage />} />
        <Route path='/account' element={<AccountPage/>}/>
      </Route>  
    </Routes>
    </BrowserRouter>
    </UserContextProvider> 
  )
}

export default App