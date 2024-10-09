'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Moment from 'react-moment'
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux'
const page = () => {
    const [Comments , setComments] = useState([])
    const {user} = useSelector(state => state.auth)
    useEffect(() => {
        axios.get("http://localhost:3001/api/comment")
            .then(res => {
                setComments(res.data)
                console.log(res.data)
                
            })
            .catch(err => console.log(err))
    }, [Comments])
    const deleteComment = (id) => {
    axios.delete(`http://localhost:3001/api/comment/${id}`, {
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
    <div className='w-[100%] min-h-[100vh] flex flex-col items-start pl-[14%] pt-8'>
        <span className='textheading text-primary font-black text-xl uppercase'>Comments</span>
        <div className='Comments mt-2 grid grid-cols-3 gap-3'>
          {
            Comments.map((comment) => {
              return (
                <div className='flex w-[400px] border-[1px] border-primary p-3 flex-row items-start gap-3' key={comment._id}>
                  <Image src={comment.user.profilePhoto.url} width={100} height={100} alt='photo' className='w-[50px] h-[50px] rounded-full'/>
                  <div className=' flex items-start flex-col gap-2'>
                    <div className='flex items-start flex-col gap-1'>
                      <span className='text-sm font-extrabold text-black'>{comment.user.name}</span>
                      <span className='text-xs text-red-600'>{<Moment fromNow>{comment.createdAt}</Moment>}</span>
                    </div>
                    <p className='text-sm text-primary tracking-[1px] font-bold'>{comment.content}</p>
                  <span onClick={()=> deleteComment(comment._id)} className='text-base flex items-center justify-center text-primary rounded-full w-[25px] h-[25px] border-[1px] border-primary'><MdDelete/></span>
                  </div>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default page