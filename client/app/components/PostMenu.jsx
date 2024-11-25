import React, { useContext, useState } from 'react'
import { Postcontext } from '../context/PostContext'
import { useSelector } from 'react-redux'
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { BsPin } from "react-icons/bs";
const PostMenu = ({postMenu , setPostUpdate, setPostId , id}) => {
  const { pinTrend, deletePost } = useContext(Postcontext)
  const { user } = useSelector(state => state.auth)
  return (
    <div className={`absolute top-5 mb-5 ${postMenu ? "flex" : "hidden"} flex-col z-[999] w-[200px] shadow-md bg-white items-start`}>
        <div onClick={() => {
                setPostUpdate(true)
                setPostId(id)
            }} className='flex items-center w-full p-3 justify-between'>
            <span ><MdOutlineEdit className='text-xl text-primary' /></span>
            <span className='text-sm font-bold text-black'>Update Post</span>
        </div>
        <div onClick={() => deletePost(id)} className='flex items-center w-full p-3 justify-between'>
            <span ><MdDelete className='text-xl text-primary cursor-pointer' /></span>
            <span className='text-sm font-bold text-black'>Delete Post</span>
        </div>
        <div onClick={() => pinTrend(id)} className='flex items-center w-full p-3 justify-between'>
            <span ><BsPin className='text-xl text-primary cursor-pointer' /></span>
            <span className='text-sm font-bold text-black'>Pin Post</span>
        </div>
    </div>
  )
}

export default PostMenu