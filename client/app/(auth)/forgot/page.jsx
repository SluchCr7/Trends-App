'use client'
import React from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Link from 'next/link';

const Page = () => {
    const [email, setEmail] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) toast.error("All fields are required")
        console.log(email)
    }
    return (
        <>
        <ToastContainer />
        <div className='w-[100%] flex flex-col gap-5 items-center justify-center min-h-[100vh] bg-dark'>
            <span className='text-3xl text-primary font-extrabold uppercase'>Forget Password</span>
            <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3'>
                <div className='w-[400px] flex items-center'>
                    <span className='w-[10%] bg-primary p-3 flex items-center justify-center'><MdOutlineEmail /></span>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' className='w-[90%] bg-[#181818] outline-none text-white p-2 pl-5' />
                </div>
                <button className='border-[1px] border-primary hover:bg-primary hover:text-white transition-all duration-300 text-primary tracking-[2px] w-[120px] bg-transparent p-2 rounded-sm'>Register</button>
                <span className='text-xs text-white'>Return and sign in <Link href={'/Login'} className='text-primary font-bold'>Login</Link></span>
            </form>
        </div>
      </>
  )
}

export default Page