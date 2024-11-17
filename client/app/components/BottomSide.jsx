import React from 'react'
import Link from 'next/link'
import { MdHomeFilled } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { useSelector } from 'react-redux';
const BottomSide = () => {
  const {user} = useSelector((state) => state.auth)
  return (
    <div className='fixed bottom-0 md:hidden px-7 py-3 w-[85%] rounded-tl-md rounded-tr-md bg-[#171717] border-t-[1px] translate-x-[-50%] left-1/2 right-1/2 mx-auto border-white/10'>
      <div className='flex items-center justify-between w-[100%] gap-5 bg-transparent backdrop-blur-xl'>
          <Link href={'/'} className={`text-3xl font-black text-primary`}><MdHomeFilled /></Link>
          <Link href={'/pages/search'} className={`text-3xl font-semibold text-white`}><CiSearch /></Link>
          {
            user ?
              <>
              <Link href={`/pages/createPost`} className={`text-3xl font-semibold text-white`}><FaPlus /></Link>
              <Link href={'/pages/Saved'} className={`text-3xl font-semibold text-white`}><CiHeart /></Link>
              </>
            : null
          }
      </div>
    </div>
  )
}

export default BottomSide