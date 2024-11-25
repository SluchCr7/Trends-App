import React, { useContext, useEffect, useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import PostMenu from './PostMenu';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { likeContext } from '../context/LikeContext';
import { Commentcontext } from '../context/CommentContext';
import { Postcontext } from '../context/PostContext';
const Post = ({_id , user , createdAt , updatedAt,content , likes , comments }) => {
    const Userprofile = useSelector((state) => state.auth)
    // const [trends, setTrends] = useState([])
    const [postMenu ,setPostMenu] = useState(false)
    const [comment, setComment] = useState(false)
    const [commentContent, setCommentContent] = useState("")
    const {HandleLike} = useContext(likeContext)
    const { AddComment } = useContext(Commentcontext)
    const {pinTrend , trends} = useContext(Postcontext)
return (
        <div className='w-[80%] lg:w-[600px] p-2 transition-all duration-700 rounded-lg post flex flex-col items-start mt-[20px] border-b-[1px] pb-3 border-white/10'>
            <div className='flex flex-row items-start gap-4 w-full'>
            <Image src={user.profilePhoto.url} width={100} height={100} className='w-[45px] h-[45px] rounded-full' />
            <div className='w-full flex flex-col items-start gap-3'>
                <div className='flex flex-row w-[100%] justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <div className='flex flex-col items-start md:flex-row md:items-center gap-2'>
                            <Link href={Userprofile.user?._id === user._id ? `/pages/Profile/${user._id}` : `/pages/user/${user._id}`}
                                className='text-base text-primary hover:underline transition-all duration-300'>
                                {user.name}
                            </Link>
                            <span className='text-[#797979] text-sm'>
                                {new Date(updatedAt) > new Date(createdAt)
                                    ?
                                    <Moment fromNow>{updatedAt}</Moment>
                                    :
                                    <Moment fromNow>{createdAt}</Moment>
                                    }
                            </span>
                        </div>  
                    </div>
                    <div className='relative'>
                        <span onClick={()=> setPostMenu(!postMenu)} className='text-lg text-primary'><BsThreeDots /></span>
                        <div className={`${postMenu ? "flex" : "hidden"}`}>
                            <PostMenu _id={_id} user={user} />
                        </div>
                    </div>
                </div>
                <Link href={`/pages/post/${_id}`} className={`text-black text-sm w-[100%] ${content.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/)?"text": ""}`}>{content}</Link>
                {
                    
                    <div className='flex flex-row items-center gap-5 mt-3'>
                        <div onClick={() => HandleLike(_id)} className='option cursor-pointer flex flex-row items-center gap-1'>
                        <span className='text-lg text-primary'>
                            {
                                likes.includes(Userprofile.user?._id) ? <FaHeart className='text-red-600' /> : <CiHeart />
                            }
                        </span>
                        <span className='text-sm text-primary'>{likes.length}</span>
                        </div>
                        <div onClick={()=> setComment(!comment)} className='option flex flex-row cursor-pointer items-center gap-1'>
                            <span className='text-lg text-primary'><FaRegComment /></span>
                            <span className='text-sm text-primary'>{comments.length}</span>
                        </div>
                    </div>
                }
            </div>
            </div>
            <div className={`${comment ? "flex" : "hidden"} items-center gap-2 w-full py-3 px-7`}>
                <input value={commentContent} onChange={(e) => setCommentContent(e.target.value)} type="text" placeholder='Add Comment' className='w-[80%] p-3 border-[1px] rounded-md border-primary bg-transparent'/>
                <button onClick={() => AddComment(_id , commentContent , setComment)} className='w-[20%] p-3 border-[1px] border-secondary bg-transparent rounded-md'>Add</button>
            </div>
        </div>
  )
}

export default Post