import Image from 'next/image'
import React from 'react'
import { IoMdClose } from "react-icons/io";
const AccountInfo = ({name , bio, nameProfile , date , img , info , setInfo}) => {
  return (
    <div className={`updated_menu ${info ? "flex" : "hidden"}`}>
      <div className='bg-white w-[85%] md:w-[430px] fixed top-1/2 left-1/2 rounded-lg p-6 translate-x-[-50%] translate-y-[-50%]'>
        <span onClick={() =>setInfo(false)} className='absolute top-1 right-1 text-md text-black'><IoMdClose/></span>
        <div className='flex flex-col w-full items-start gap-2'>
          <div className='flex items-end justify-between w-full'>
            <div className='flex items-start flex-col gap-1'>
              <span className='text-primary'>Name</span>
              <span className=' border-b-[1px] border-black pb-2'>{name} . {nameProfile}</span>
            </div>
            <Image src={img} alt='' width={100} height={100} className='w-[60px] h-[60px] rounded-full' />
          </div>
          <div className='flex items-start flex-col gap-1 border-b-[1px] border-black pb-2 w-full'>
            <span className='text-primary'>Bio</span>
            <span className=''>{bio}</span>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <span className='text-primary'>Joined</span>
            <span>{new Date().toDateString(date)}</span>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default AccountInfo