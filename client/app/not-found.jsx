import React from 'react'

const notfound = () => {
  return (
    <div className='bg-black w-full min-h-[100vh] flex items-center justify-center'>
      <div className='header flex flex-col items-center justify-center w-full py-3 px-9 z-[999]'>
        <span className='text-9xl text-primary font-bold capitalize'>404</span>
        <span className='text-lg text-primary font-bold capitalize'>oops! page not found</span>
        <p className='text-sm text-white font-bold capitalize w-[50%] text-center pt-3'>The page you are looking for doesn't exist. Go back and try again in a correct path or contact your administrator.</p>
        <button className='border-[1px] mt-3 border-primary hover:bg-primary hover:text-white transition-all duration-300 text-primary tracking-[2px] w-[80px] bg-transparent p-2 rounded-sm'>Login</button>
      </div>
    </div>
  )
}

export default notfound