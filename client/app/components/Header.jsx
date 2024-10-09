'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaCircleUser } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import {useSelector , useDispatch} from 'react-redux'
import { LogoutUser } from '../redux/apiCalls/authapicall';
import { MdDashboard } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Header = ({login , setLogin , setRegister , register}) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    
    const [show, setShow] = useState(false)
    const [hide , setHide] = useState(false)
    const handleLogout = () => {
        swal({
            title: "Are you sure?",
            text: "You are go to logout from your account !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(willLogout => {    
                if (willLogout) {
                    dispatch(LogoutUser())
                    setShow(false)
                    // toast.success("Logout Successfully")
                    window.location.href("/")
                }
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        if(window.location.href.includes("pages/dashboard")) setHide(true)
    }, [])
    const handleLogin = () => {
        setLogin(!login)
        setRegister(false)
    }
return (
    <>
    <ToastContainer />
    <div className={`header sticky top-0 bg-[#bfc0c0]  ${hide ? 'hidden' : 'flex'} items-center w-full justify-between py-2 px-9 z-[999] border-[1px]  `}>
        <div className='Logo'>
            <Link href={"/"}><Image src={"/logo.svg"} alt="logo" width={30} height={30} /></Link>
        </div>
        <span className='text-lg text-primary font-bold uppercase tracking-[3px]'>
            Trendes
        </span>
        {
            user ? 
                <>
                    <div className='relative flex flex-row items-center gap-4'>
                        {
                            user?.isAdmin &&
                            <Link href={'/pages/dashboard'} className='text-lg text-primary font-bold'><MdDashboard /></Link>
                        }
                        <Image onClick={() => setShow(!show)} src={user.profilePhoto.url} alt="logo" width={100} height={100} className='w-[40px] h-[40px] rounded-full' />
                        <div className={`${show ? 'flex' : 'hidden'} flex flex-col items-start w-[200px] border-[1px] border-primary absolute top-[3.25rem] left-[-10rem]`}>
                            <Link href={`/pages/Profile/${user._id}`} className='flex flex-row w-full justify-between p-3 items-center hover:bg-[#181818] transition-all duration-700'>
                                <span className='text-sm text-primary font-bold'>Profile</span>
                                <span className='text-sm text-primary font-bold'><FaCircleUser /></span>
                            </Link>
                            <div onClick={handleLogout} className='flex flex-row w-full justify-between p-3 items-center hover:bg-[#181818] transition-all duration-700'>
                                <span className='text-sm text-primary font-bold'>Logout</span>
                                <span className='text-sm text-primary font-bold'><CiLogout /></span>
                            </div>
                        </div>
                    </div> 
                </>
            : (
                <>
                    <div>
                        <button className='text-lg text-primary font-black uppercase' onClick={handleLogin}>Login</button>
                    </div>
                </>
            )
        }
    </div>
    </>
  )
}

export default Header