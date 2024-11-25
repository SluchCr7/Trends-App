'use client'
import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Moment from 'react-moment'
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux'
import { Postcontext } from '@/app/context/PostContext'
const Page = () => {
  const { user } = useSelector(state => state.auth)
  const { posts , deletePost } = useContext(Postcontext)

  return (
    <div className='w-[100%] min-h-[100vh] flex flex-col items-center md:items-start md:pl-[14%] pt-8'>
      <span className='textheading text-primary font-black text-xl uppercase'>Posts</span>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {
          posts.map((post) => {
            return(
              <div className='w-full flex-col p-3 flex items-start gap-2' key={post._id}>
                <div className='flex flex-col items-start gap-2'>
                  <div className='flex items-start w-[80%] mx-auto md:w-[500px]  border-[1px] border-secondary p-3 gap-2'>
                    <Image src={post.user.profilePhoto.url} alt='user' className='w-[50px] h-[50px] rounded-full' width={100} height={100}/>  
                    <div className='flex items-start flex-col gap-3'>
                      <div className='flex items-start flex-col gap-1'>
                        <span className='text-sm text-primary font-extrabold'>{post.user.name}</span>
                        <span className='text-xs text-black'>{
                          <Moment fromNow>{post.createdAt}</Moment>
                        }</span>
                      </div>
                      <div className='flex items-start flex-col gap-2'>
                        <p className='text-sm text-primary bio'>{post.content}</p>
                        <span onClick={()=> deletePost(post._id)} className='text-base flex items-center justify-center text-primary rounded-full w-[25px] h-[25px] border-[1px] border-primary'><MdDelete/></span>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
          )})
        }
      </div>
    </div>
  )
}

export default Page