import React from 'react'
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";


const Menuoptions = ({menu , setMenu , setopenMenu , openMenu , setInfo}) => {
  return (
    <div className={`menu absolute top-5 flex-col items-start w-[200px] border-[1px]  left-[-10rem] bg-[#bebdbd] z-50 ${menu ?"showClass":"hiddenClass"}`}>
        <div className='menu_wrap'>
            <ul className='flex flex-col items-start gap-3 w-full'>
                <li onClick={()=> setInfo(true)} className='flex items-center gap-2 justify-between w-full px-1'>
                    <span className='text-primary text-sm font-extrabold'>About</span>
                    <CiCircleInfo className='text-base text-[black]' />
                </li>
                <li className='flex items-center gap-2 justify-between w-full px-1'>
                    <span className='text-primary text-sm font-extrabold'>Copy Link</span>
                    <IoIosLink className='text-base text-[black]' />
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Menuoptions