'use client'
import React from 'react'
import { icons } from '../Data'
import Link from 'next/link'
import { MdHomeFilled } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
// import { CiHeart } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaCircleUser } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa6";
import { usePathname } from 'next/navigation';
import { MdOutlineDashboard } from "react-icons/md";
const Leftsidebar = () => {
  const { user } = useSelector((state) => state.auth)
  const pathname = usePathname()
  return (
    <div className={`hidden md:flex items-center fixed top-1 left-0 flex-col justify-between h-full pl-[10px]`}>
      <div className='flex flex-col items-center justify-between h-[80vh] bg-black navLinks'>
        <div className='flex flex-col items-center gap-8 text-white/55'>
          <Link href={'/'} className={`text-3xl font-black ${pathname == "/" ? "text-primary" : "text-white"}`}><MdHomeFilled /></Link>
          <Link href={'/pages/search'} className={`text-3xl font-semibold ${pathname == "/pages/search" ? "text-primary" : "text-white"}`}><CiSearch /></Link>
          {
            user ?
              <>
              <Link href={`/pages/createPost`} className={`text-3xl font-semibold ${pathname == "/pages/createPost" ? "text-primary" : "text-white"}`}><FaPlus /></Link>
              {/* <Link href={'/pages/Saved'} className={`text-3xl font-semibold ${pathname == "/pages/Saved" ? "text-primary" : "text-white"}`}><CiHeart /></Link> */}
              </>
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default Leftsidebar