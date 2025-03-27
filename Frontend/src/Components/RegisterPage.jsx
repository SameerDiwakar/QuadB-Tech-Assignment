import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const registerUser = async (ev) => {
    ev.preventDefault()
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('Registration Successful. Now you can log in');
      navigate('/login');
    } catch (e) {
      alert('Registration Failed. Please Try again Later');
      console.log(e);
    }
  }

  return (
    <div className="flex items-center justify-center mt-2 bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?abstract,technology')" }}>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md animate-fade-in">
        <h1 className="text-4xl text-center mb-3 font-bold text-pink-600 animate-bounce-in">
          Join Us Today!
        </h1>
        <p className="text-center text-gray-500 mb-6 italic animate-fade-in-delayed">
          "The journey of a thousand miles begins with a single step."
        </p>
        <form className="flex flex-col gap-6" onSubmit={registerUser}>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input type="text"
              className="border-2 border-gray-300 outline-none py-3 px-10 rounded-xl w-full transition focus:border-pink-500 focus:ring-2 focus:ring-pink-300"
              placeholder="John Doe"
              value={name}
              onChange={ev => setName(ev.target.value)} />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input type="email"
              className="border-2 border-gray-300 outline-none py-3 px-10 rounded-xl w-full transition focus:border-pink-500 focus:ring-2 focus:ring-pink-300"
              placeholder="JohnDoe@email.com"
              value={email}
              onChange={ev => setEmail(ev.target.value)} />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input type="password"
              className="border-2 border-gray-300 outline-none py-3 px-10 rounded-xl w-full transition focus:border-pink-500 focus:ring-2 focus:ring-pink-300"
              placeholder="Password"
              value={password}
              onChange={ev => setPassword(ev.target.value)} />
          </div>
          <button className="bg-pink-600 text-white py-3 px-6 rounded-full hover:bg-pink-700 transition transform hover:scale-105">
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-pink-600 hover:text-pink-800 transition" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
