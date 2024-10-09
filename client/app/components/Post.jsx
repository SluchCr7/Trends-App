import React, { useState } from 'react'
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
const Post = ({_id , user , createdAt , content , likes , comments , index}) => {
    const Userprofile = useSelector((state) => state.auth)
    const [postMenu , setPostMenu] = useState(false)
    const [comment, setComment] = useState(false)
    const [commentContent, setCommentContent] = useState("")
    const handleLike = (postId) => {
        axios.put(`http://localhost:3001/api/post/like/${postId}` , {},{headers : {Authorization : `Bearer ${Userprofile.user.token}`}})
        .then(res => {
        toast.success("Post Liked")
        })
        .catch(err => {
        console.log(err)
        toast.error("Something went wrong")
        })
    }
    const handleComment = (postId) => {
        // e.preventDefault()
        if (!commentContent) {
            toast.error("Comment can't be empty")
        }
        else {
            axios.post(`http://localhost:3001/api/comment`, {
                content: commentContent,
                postId
            }, {
                headers: {
                    Authorization: `Bearer ${Userprofile.user.token}`,
                    "Content-Type": "application/json"
                }
            }).then(res => {
                console.log(res.data)
                toast.success("Comment Added")
                setCommentContent("")
            })
            .catch(err => {
                console.log(err)
                toast.error("Something went wrong")
            })
        }
    }
  return (
        <div className='w-[600px]  p-2 transition-all duration-700 rounded-lg post flex flex-col items-start mt-[20px] border-b-[1px] pb-3 border-white/10' key={index}>
            <div className='flex flex-row items-start gap-4 w-full'>
            <Image src={user.profilePhoto.url} width={100} height={100} className='w-[45px] h-[45px] rounded-full' />
            <div className='w-full flex flex-col items-start gap-3'>
                <div className='flex flex-row w-[100%] justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                    <Link href={Userprofile.user?._id === user._id ? `/pages/Profile/${user._id}` : `/pages/user/${user._id}` } className='text-base text-primary hover:underline transition-all duration-300'>{user.name}</Link>
                    <span className='text-[#797979] text-sm'>
                        <Moment fromNow>{createdAt}</Moment>
                    </span>
                    </div>  
                </div>
                {/* <div className='relative'>
                    <span onClick={()=> setPostMenu(!postMenu)} className='text-lg text-primary'><BsThreeDots /></span>
                    <div className={`${postMenu ? "flex" : "hidden"}`}>
                        <PostMenu />
                    </div>
                </div> */}
                </div>
                <Link href={`/pages/post/${_id}`} className='text-black text-sm w-[100%] text'>{content}</Link>
                {
                    
                    <div className='flex flex-row items-center gap-5 mt-3'>
                        <div onClick={() => handleLike(_id)} className='option cursor-pointer flex flex-row items-center gap-1'>
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
                <button onClick={() => handleComment(_id)} className='w-[20%] p-3 border-[1px] border-secondary bg-transparent rounded-md'>Add</button>
            </div>
        </div>
  )
}

export default Post