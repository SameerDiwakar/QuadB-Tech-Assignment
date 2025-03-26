import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IndexPage from './components/IndexPage'
import LoginPage from './components/LoginPage'
import Layout from './Layout'
import RegisterPage from './components/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AccountPage from './components/AccountPage'
import Todo from './Components/Todo'
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
        <Route path='/todo' element={<Todo/>}/>
      </Route>  
    </Routes>
    </BrowserRouter>
    </UserContextProvider> 
  )
}

export default App