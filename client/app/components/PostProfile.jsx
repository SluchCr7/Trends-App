'use client'
import React, { useEffect } from 'react'
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
import { BsPin } from "react-icons/bs";
import { Postcontext } from '@/app/context/PostContext'
import { likeContext } from '@/app/context/LikeContext'
import UpdatePost from '@/app/components/UpdatePost'
import { BsThreeDots } from "react-icons/bs";
import PostMenu from './PostMenu';
const PostProfile = ({ post }) => {
    const [postUpdate, setPostUpdate] = useState(false)
    const { user } = useSelector(state => state.auth)
    const { profile } = useSelector(state => state.profile)
    const [postId, setPostId] = useState("")
    const { deletePost , pinTrend } = useContext(Postcontext)
    const { HandleLike } = useContext(likeContext)
    const [postMenu , setPostMenu] = useState(false)
    const [content, setContent] = useState("")
    const [postTrend , setPostTrend] = useState(false) // todo => add this state in posts include in trends array to hide him 
    const handleEdit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3001/api/post/${postId}`, {
            content
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
                handleEdit={handleEdit} setContent={setContent} content={content}
            />
            <div id={post._id} key={post._id} className={`w-full p-2 border-b-[1px] ${postTrend ? "hidden" : "block"} border-[#404040] pb-7`}>
                <div className='flex items-start gap-3 w-full'>
                    <Image src={profile?.profilePhoto.url} alt="logo" width={40} height={40} className='w-[50px] h-[50px] rounded-full' />
                    <div className='flex flex-col items-start gap-1 w-full'>
                        <div className='flex flex-col md:flex-row items-start md:items-center gap-2 justify-between w-full'>
                            <div className='flex items-start md:items-center flex-col md:flex-row  gap-2'>
                                <span className='text-sm text-primary font-bold'>{profile?.name}</span>
                                <span className='text-xs text-[#b3b3b3]'>
                                    <Moment fromNow> 
                                        {post.createdAt}
                                    </Moment>
                                </span>
                            </div>
                            <div className='relative'>
                                <span onClick={()=> setPostMenu(!postMenu)} className='text-black text-lg'><BsThreeDots/></span>
                                <PostMenu id={post._id} postMenu={postMenu} setPostUpdate={setPostUpdate} setPostId={setPostId} />
                            </div>
                        </div>
                        <Link href={`/pages/post/${post?._id}`} className={`text-sm text-black font-bold ${content.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/)?"text": ""}`}>{post.content}</Link>
                        <div className='flex items-center gap-5 mt-2'>
                            <button onClick={async () => {
                                await HandleLike(post._id)
                                window.location.reload()
                            }} className='flex items-center gap-2'>
                                <span className='text-sm text-black '>{post.likes.length}</span>
                                <span className='text-base text-primary font-bold'>
                                    {
                                        post.likes.includes(user?._id) ? <FaHeart className='text-red-500'/> : <CiHeart />
                                    }
                                </span>
                            </button>
                            <Link href={`/pages/post/${post?._id}`} className='flex items-center gap-2'>
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

export default PostProfile