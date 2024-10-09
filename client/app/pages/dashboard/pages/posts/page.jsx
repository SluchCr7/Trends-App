'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Moment from 'react-moment'
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux'
// import deletePost from '@/app/utils/Getusers'
const page = () => {
  const [Posts, setPosts] = useState([])
  const {user} = useSelector(state => state.auth)
  useEffect(() => {
    axios.get("http://localhost:3001/api/post")
        .then(res => {
          setPosts(res.data)
          console.log(res.data)
        })
        .catch(err=> console.log(err))
  }, [Posts])
  const deletePost = (id) => {
    axios.delete(`http://localhost:3001/api/post/${id}`, {
      headers: {
          Authorization : `Bearer ${user.token}`
      }
      })
      .then((res) => {
          console.log("deleted Succesfully")
          window.location.reload()
      })
      .catch(err=> console.log(err))
  }
  return (
    <div className='w-[100%]  min-h-[100vh] flex flex-col items-start pl-[14%] pt-8'>
      <span className='textheading text-primary font-black text-xl uppercase'>Posts</span>
      <div className='grid grid-cols-3 gap-3'>
        {
          Posts.map((post) => {
            return(
              <div className='w-full flex-col p-3 flex items-start gap-2' key={post._id}>
                <div className='flex flex-col items-start gap-2'>
                  <Image src={post.user.profilePhoto.url} alt='user' className='w-[50px] h-[50px] rounded-full' width={100} height={100}/>  
                  <div className='flex items-start flex-col gap-1'>
                    <span className='text-sm text-primary font-extrabold'>{post.user.name}</span>
                    <span className='text-xs text-black'>{
                      <Moment fromNow>{post.createdAt}</Moment>
                    }</span>
                  </div>
                  <p className='text-sm text-primary w-[70%]'>{post.content}</p>
                  <span onClick={()=> deletePost(post._id)} className='text-base flex items-center justify-center text-primary rounded-full w-[25px] h-[25px] border-[1px] border-primary'><MdDelete/></span>
                </div>
              </div>
          )})
        }
      </div>
    </div>
  )
}

export default page