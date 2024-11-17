'use client'
import React, { useEffect ,  useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostMenu from './PostMenu';
import Post from './Post';
const Homepage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const Userprofile = useSelector((state) => state.auth)
  useEffect(() => {
    axios.get("http://localhost:3001/api/post")
      .then(res => {
        setPosts(res.data)
        setLoading(true)
      })
      .catch(err => {
        console.log(err)
      })
  }, [posts])

  return (
    <div className={`w-[100%] flex flex-col items-start ${loading ? "pl-[8%] md:pl-[15%] lg:pl-[30%]" : ""}`}>
      {
        loading ?
        posts.map(({_id, content, user, postId, username, createdAt, updatedAt, __v , likes , comments} , index) => {
          return (
            <Post _id={_id}  content={content} user={user} postId={postId} username={username} createdAt={createdAt}  likes={likes} comments={comments} index={index} />
          )
        })
          :
            <div className='flex items-center justify-center w-full min-h-[80vh]'>
                <div className='w-[80px] itemanimate flex items-center justify-center h-[80px] border-[2px] border-primary rounded-full'></div>
            </div> 
      }
    </div>
  )
}

export default Homepage            