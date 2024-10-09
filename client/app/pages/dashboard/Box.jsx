import Link from 'next/link'
import React from 'react'

const Box = ({color , text , icon , number , link}) => {
  return (
    <Link href={`/dashboard/pages/${link}}`} className={`w-[380px] bg-[#${color}] rounded-[10px] flex flex-col items-start gap-6 p-5`}>
        <div className='flex flex-row items-center justify-between w-full'>
            <span className='text-base text-primary font-bold'>{text}</span>
            <span className='text-xl text-primary font-bold'>{icon}</span>
        </div>  
        <span className='text-xl text-primary font-bold'>{number}</span>
    </Link>
  )
}

export default Box