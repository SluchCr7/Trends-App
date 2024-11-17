import React from 'react'
import { icons } from '../Data'
import Link from 'next/link'
import { MdHomeFilled } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { useSelector } from 'react-redux';
const Leftsidebar = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <div className={` hidden md:flex items-center fixed top-1 left-0 flex-col justify-between h-full pl-[10px]`}>
      <div className='flex flex-col items-center justify-between h-[80vh] navLinks'>
        <div className='flex flex-col items-center gap-8 text-white/55'>
          <Link href={'/'} className={`text-3xl font-black text-primary`}><MdHomeFilled /></Link>
          <Link href={'/pages/search'} className={`text-3xl font-semibold text-white`}><CiSearch /></Link>
          {
            user ?
              <>
              <Link href={`/pages/createPost`} className={`text-3xl font-semibold text-white`}><FaPlus /></Link>
              {/* <Link href={'/pages/Saved'} className={`text-3xl font-semibold text-white`}><CiHeart /></Link> */}
              </>
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default Leftsidebar