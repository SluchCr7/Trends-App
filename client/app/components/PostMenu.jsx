import React from 'react'

const PostMenu = () => {
  return (
    <div className='flex absolute top-6 left-[-30px] items-center text-sm font-bold flex-col gap-3 w-[180px] shadow-lg bg-white text-black'>
        <div className='w-full flex items-center justify-between p-3'>
            <span>Pin To Top</span>
        </div>
        <div className='w-full flex items-center justify-between bg-red-500 text-white p-3'>
            <span>Report This Trend</span>
        </div>
        
    </div>
  )
}

export default PostMenu