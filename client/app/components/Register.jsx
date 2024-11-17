'use client'
import Link from 'next/link';
import React from 'react'
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RegisterUser } from '@/app/redux/apiCalls/registercall';
import swal from "sweetalert"
const Register = ({register , setRegister , setLogin , login}) => {
    const dispatch = useDispatch()
    const { registermessage } = useSelector(state => state.register)
    const [name, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !email || !password) toast.error("All fields are required")
        dispatch(RegisterUser({ name, email, password }))
        // setRegister(!register)
        // setLogin(!login)
    }
    if (registermessage) {
        swal({
            title: registermessage,
            icon: "success",
            button: "Ok",
        }).then(() => {
            // window.location.href = ""
            window.location.reload()
        })
    }
    return (
<>
<ToastContainer />
<div className={`updated_menu ${register ? "flex" : "hidden"}`}>
    <div className='bg-white p-5 rounded-lg md:w-[500px] w-[80%] flex items-center justify-center text-center flex-col'>
        <span className='text-3xl text-primary font-extrabold uppercase p-4'>Register</span>
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3'>
            <div className='w-[80%] md:w-[400px] flex items-center'>
                <span className='w-[10%] bg-primary p-3 flex items-center justify-center'><CiUser /></span>
                <input value={name} onChange={(e) => setUserName(e.target.value)} type="text" placeholder='Name' className='w-[90%] bg-[#181818] outline-none text-white p-2 pl-5' />
            </div>
            <div className='w-[80%] md:w-[400px] flex items-center'>
                <span className='w-[10%] bg-primary p-3 flex items-center justify-center'><MdOutlineEmail /></span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' className='w-[90%] bg-[#181818] outline-none text-white p-2 pl-5' />
            </div>
            <div className='w-[80%] md:w-[400px] flex items-center'>
                <span className='w-[10%] bg-primary p-3 flex items-center justify-center'><TbPassword /></span>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='w-[90%] bg-[#181818] outline-none text-white p-2 pl-5' />
            </div>
            <button className='border-[1px] border-primary hover:bg-primary hover:text-white transition-all duration-300 text-primary tracking-[2px] w-[80%] md:w-[120px] bg-transparent p-2 rounded-sm'>Register</button>
            <span className='text-xs text-white'>Already have an account?
                <span onClick={() => {
                    setRegister(false)
                    setLogin(true)
                    }}
                    className='text-primary font-bold'>Login
                </span>
            </span>
        </form>
        </div>
    </div>
    </>
  )
}

export default Register