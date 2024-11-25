'use client'
import React, { useContext, useEffect ,  useState } from 'react'
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Post from './Post';
import { Postcontext } from '../context/PostContext';
import Loading from './Loading';
const Homepage = () => {
  // const [loading, setLoading] = useState(false)
  const {posts , loading} = useContext(Postcontext)
  const Userprofile = useSelector((state) => state.auth)
  return (
    <div className={`w-[100%] flex flex-col items-start ${loading ? "pl-[8%] md:pl-[15%] lg:pl-[30%]" : ""}`}>
      {
        loading ?
        posts.map(({_id, content, user, postId, username, createdAt, updatedAt, __v , likes , comments} , index) => {
          return (
            <Post _id={_id} key={index}  content={content} user={user} postId={postId} updatedAt={updatedAt} username={username} createdAt={createdAt}  likes={likes} comments={comments} index={index} />
          )
        })
          :
            <Loading />
      }
    </div>
  )
}

export default Homepage            