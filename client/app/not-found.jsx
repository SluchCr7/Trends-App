import Link from 'next/link'
import React from 'react'

const notfound = () => {
  return (
    <div className='w-full min-h-[100vh] flex items-center justify-center'>
      <div className='header flex flex-col items-center justify-center w-full py-3 px-9 z-[999]'>
        <span className='text-7xl text-primary font-bold capitalize'>404</span>
        <span className='text-lg text-primary font-bold capitalize'>oops! page not found</span>
        <p className='text-sm text-white font-bold capitalize w-[50%] text-center pt-3'>The page you are looking for doesn`&apos;`t exist. Go back and try again in a correct path or contact your administrator.</p>
        <Link href={"/"} className='border-[1px] mt-3 border-primary hover:bg-primary hover:text-white transition-all duration-300 text-primary tracking-[2px] w-[100px] bg-transparent p-2 rounded-sm'>Back</Link>
      </div>
    </div>
  )
}

export default notfound