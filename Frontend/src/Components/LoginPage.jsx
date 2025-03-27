import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../UserContext.jsx";
import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const {data} = await axios.post('/login', {email,password});
      setUser(data);
      alert('Login successful');
      setRedirect(true);
    } catch (e) {
      alert('Login failed');
    }
  }

  if (redirect) {
    return <Navigate to={'/account'} />
  }
  return (
    <div className="flex items-center justify-center mt-6 bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?nature,technology')" }}>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md animate-fade-in">
        <h1 className="text-4xl text-center mb-4 font-bold text-pink-600 animate-bounce-in">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-500 mb-6 italic animate-fade-in-delayed">
          "Hard work beats talent when talent doesn't work hard."
        </p>
        <form className="flex flex-col gap-6" onSubmit={handleLoginSubmit}>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input type="email"
                   className="border-2 border-gray-300 outline-none py-3 px-10 rounded-xl w-full transition focus:border-pink-500 focus:ring-2 focus:ring-pink-300"
                   placeholder="Your Email"
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
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-pink-600 hover:text-pink-800 transition" to={'/register'}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}