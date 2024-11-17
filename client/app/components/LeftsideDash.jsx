'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { useSelector } from 'react-redux';
const LeftsideDash = () => {
    const {user} = useSelector(state => state.auth)
    return (
    <div className='w-[100%] md:w-[10%] bg-[#181818] p-5 md:py-12 md:h-[100vh] fixed left-[0px] top-[0px]'>
        <div className='flex md:flex-col md:items-start items-center flex-row justify-between md:h-full w-full'>
            <div className='logo'> 
                <Link href={'/'}><Image src={'/logo.svg'} alt="logo" width={30} height={30} /></Link>
            </div>
            <div className='menu'>
                <ul className='flex md:flex-col md:items-start flex-row items-center gap-6'>
                    <li className='active text-white capitalize text-2xl'><Link href={'/pages/dashboard'}><MdOutlineDashboard /></Link></li>
                    <li className='text-white capitalize text-2xl'><Link href={'/pages/dashboard/pages/user'}><FaCircleUser /></Link></li>
                    <li className='text-white capitalize text-2xl'><Link href={'/pages/dashboard/pages/posts'}><FiEdit /></Link></li>
                    <li className='text-white capitalize text-2xl'><Link href={'/pages/dashboard/pages/comments'}><FaRegComment /></Link></li>
                </ul>
            </div>
            <div className='logout text-primary text-2xl font-black uppercase'>
                    <Link href={`/pages/Profile/${user?._id}`}>
                        <Image src={user?.profilePhoto?.url} width={100} height={100}
                            className='w-[30px] h-[30px] rounded-full'/>
                    </Link>
            </div>
        </div>
    </div>
  )
}

export default LeftsideDash