'use client'
import React from 'react'
import { useContext , useState } from 'react';
import { useSelector } from 'react-redux'
import Moment from 'react-moment';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { Postcontext } from '@/app/context/PostContext'
import { likeContext } from '@/app/context/LikeContext'
import UpdatePost from '@/app/components/UpdatePost'
import { BsThreeDots } from "react-icons/bs";
import { BsPin } from "react-icons/bs";
import { RiUnpinLine } from "react-icons/ri";
const PostPin = ({_id , content, createdAt , likes}) => {
    const [postUpdate, setPostUpdate] = useState(false)
    const { user } = useSelector(state => state.auth)
    const { profile } = useSelector(state => state.profile)
    const [postId, setPostId] = useState("")
    const { deletePost , unPinPost} = useContext(Postcontext)
    const { HandleLike } = useContext(likeContext)
    const [postMenu , setPostMenu] = useState(false)
    const [contentReg, setContent] = useState("")

    const handleEdit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3001/api/post/${postId}`, {
            contentReg
        },{
            headers: {
                "Authorization" : `Bearer ${user?.token}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    window.location.reload()
                }
            })
            .catch((err) => {   
                console.log(err)
            })
    }
  return (
        <>
            <UpdatePost postUpdate={postUpdate}
                handleEdit={handleEdit} setContent={setContent} content={contentReg}
            />
            <div  key={_id} className='w-full  border-b-[1px] p-2  border-[#404040] pb-7'>
                <div className='flex items-start gap-3 w-full'>
                    <Image src={profile?.profilePhoto.url} alt="logo" width={40} height={40} className='w-[50px] h-[50px] rounded-full' />
                    <div className='flex flex-col items-start gap-1 w-full'>
                        <div className='flex flex-col md:flex-row items-start md:items-center gap-2 justify-between w-full'>
                            <div className='flex items-start md:items-center flex-col md:flex-row  gap-2'>
                                <span className='text-sm text-primary font-bold'>{profile?.name}</span>
                                <span className='text-xs text-[#b3b3b3]'>
                                    <Moment fromNow> 
                                        {createdAt}
                                    </Moment>
                                </span>
                            </div>
                            <div className='relative flex items-center gap-3'>
                                <span className='text-lg text-black '><BsPin/></span>
                                <span onClick={()=> setPostMenu(!postMenu)} className='text-black text-lg'><BsThreeDots/></span>
                                <div className={`absolute top-5 mb-5 ${postMenu ? "flex" : "hidden"} flex-col z-[999] w-[200px] shadow-md bg-white items-start`}>
                                    <div className='flex items-center w-full p-3 justify-between'>
                                        <span onClick={() => {
                                            setPostUpdate(true)
                                            setPostId(_id)
                                        }}><MdOutlineEdit className='text-xl text-primary' /></span>
                                        <span className='text-sm font-bold text-black'>Update Post</span>
                                    </div>
                                    <div className='flex items-center w-full p-3 justify-between'>
                                        <span onClick={() => deletePost(_id)}><MdDelete className='text-xl text-primary cursor-pointer' /></span>
                                        <span className='text-sm font-bold text-black'>Delete Post</span>
                                    </div>
                                    <div className='flex items-center w-full p-3 justify-between'>
                                        <span onClick={() => unPinPost(_id)}><RiUnpinLine className='text-xl text-primary cursor-pointer' /></span>
                                        <span className='text-sm font-bold text-black'>UnPin Post</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link href={`/pages/post/${_id}`} className={`text-sm text-black font-bold ${contentReg.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/)?"text": ""}`}>{content}</Link>
                        <div className='flex items-center gap-5 mt-2'>
                            <button onClick={async () => {
                                await HandleLike(_id)
                                window.location.reload()
                            }} className='flex items-center gap-2'>
                                {<span className='text-sm text-black '>{likes.length}</span> }
                                {<span className='text-base text-primary font-bold'>
                                    {
                                        likes.includes(user?._id) ? <FaHeart className='text-red-500'/> : <CiHeart />
                                    }
                                </span>}
                            </button>
                            <Link href={`/pages/post/${_id}`} className='flex items-center gap-2'>
                                {/* <span className='text-sm text-white '>{post.comments.length}</span> */}
                                <span className='text-base text-primary font-bold'><FaRegComment /></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default PostPin