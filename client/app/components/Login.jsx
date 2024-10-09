'use client'
import React from 'react'
import Link from 'next/link';
import { MdOutlineEmail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { LoginUser } from '@/app/redux/apiCalls/authapicall';
const Login = ({login , setLogin , register , setRegister}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
    e.preventDefault()
        if (!email || !password) toast.error("All fields are required")
        console.log({ email, password })
        dispatch(LoginUser({ email, password }))
        setLogin(!login)
    }
    const handleRegister = () => {
        setRegister(!register)
        setLogin(false)
    }
  return (
    <div className={`updated_menu ${login ? "flex" : "hidden"}`}>
        <div className='bg-white p-5 rounded-lg w-[500px] flex items-center justify-center text-center flex-col'>
            <span className='text-3xl text-primary font-extrabold uppercase pb-3'>Go Now</span>
            <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3'>
                <div className='w-[400px] flex items-center'>
                    <span className='w-[10%] bg-primary p-3 flex items-center justify-center'><MdOutlineEmail /></span>
                    <input value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text" placeholder='Email' 
                        className='w-[90%] bg-[#EDEFF2] outline-none text-primary p-2 pl-5 rounded-tr-md rounded-br-md' />
                </div>
                <div className='w-[400px] flex items-center'>
                    <span className='w-[10%] bg-primary p-3 flex items-center justify-center'><TbPassword /></span>
                    <input value={password} onChange={(e) => setPassword(e.target.value)}
                        type="password" placeholder='Password' className='w-[90%] bg-[#EDEFF2] outline-none text-primary p-2 pl-5 rounded-tr-md rounded-br-md' />
                </div>
                <Link href={'/forgot'} className='text-xs text-start text-white '>Forgot Password</Link>
                <button type='submit' className='border-[1px] border-primary hover:bg-primary hover:text-white transition-all duration-300 text-primary tracking-[2px] w-full bg-transparent p-2 rounded-sm'>Login</button>
                <span className='text-xs text-secondary'>Don't have an account? <span onClick={handleRegister} className='text-primary font-bold'>Sign Up</span></span>
            </form>
            </div>
    </div>
  )
}

export default Login