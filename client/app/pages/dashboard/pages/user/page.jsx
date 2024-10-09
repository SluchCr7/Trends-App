'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import swal from 'sweetalert'
const page = () => {
    const [users, setUsers] = useState([])
    const [bio , setBio] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:3001/api/auth")
            .then(res => {
                console.log(res.data)
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const deleteUser = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:3001/api/auth/${id}`)
                .then(res => {
                    console.log(res.data)
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err)
                })
            } else {
              swal("Your imaginary file is safe!");
              }
          });
    }
  return (
    <div className='w-[100%] min-h-[100vh] flex flex-col items-start pl-[14%] pt-8'>
        <span className='textheading text-primary font-black text-xl uppercase'>Users</span>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3'>
            {
                users.map((item, index) => (
                    <div key={index} className='flex w-[360px] flex-col items-center gap-3 border-[1px] border-primary p-3'>
                        <Image src={item.profilePhoto.url} width={100} height={100} 
                            className='w-[70] h-[70] rounded-full' />
                        <div className='flex flex-col items-center gap-1'>
                            <span className='text-black font-black text-base'>{item.name}</span>
                            <span className={`text-primary text-xs text-center ${bio ? "" : "bio"}`} onClick={()=> setBio(!bio)}>{item.bio}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <button className='border-[1px] border-primary p-2 text-primary w-[100px]'><Link href={`/pages/user/${item._id}`}>Profile</Link></button>
                            <button className='border-[1px] border-primary p-2 text-primary w-[100px]' onClick={() => deleteUser(item._id)}>Delete</button>
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className='flex flex-col items-center gap-1'>
                                <span className='text-primary text-sm uppercase font-extrabold'>Posts</span>
                                <span className='text-white text-lg'>{item.posts.length}</span>
                            </div>
                            <div className='flex flex-col items-center gap-1'>
                                <span className='text-primary text-sm uppercase font-extrabold'>Comments</span>
                                <span className='text-white text-lg'>{item.comments.length}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default page