'use client'
import React, { useEffect , useState} from 'react'
import { comments } from '../../../Data'
import { BsThreeDots } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import Swal from 'sweetalert2'
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
// import UpdatePostModel from '@/app/components/UpdatePostModel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'react-moment'
import { useSelector } from 'react-redux';
const page = (props) => {
  const id = props.params.id
  const { user } = useSelector((state) => state.auth)
  const [textcomment, setTextComment] = useState('')
  const [post, setPosts] = useState({})
  const [content , setContent] = useState('')
  const [open, setOpen] = useState(false)
  const [loading , setLoading] = useState(false)
  const [all , setAll ] = useState(false)
  const [postMenu, SetpostMenu] = useState(false)
    const deletePost = (PostId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:3001/api/post/${PostId}`, {
                    headers: {
                        "Content-Type": "application/json",
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
        });
    }
    useEffect(() => { 
      console.log(user)
    },[user])
    const handleComment = (e) => {
      e.preventDefault()
      if (!textcomment) {
        toast.error("Comment can't be empty")
      }
      else{
        axios.post(`http://localhost:3001/api/comment`, {
          content: textcomment,
          postId : id
        }, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json"
          }
        }).then(res => {
          console.log(res.data)
          toast.success("Comment Added")
          setTextComment("")
        })
        .catch(err => {
          console.log(err)
          toast.error("Something went wrong")
        })
      }
    }
    useEffect(() => {
      axios.get(`http://localhost:3001/api/post/${id}`)
        .then(res => {
          setPosts(res.data)
          // console.log(res.data.user)
          setContent(res.data.content)
          setLoading(true)
        })
        .catch(err => {
          console.log(err)
        })
    }, [post])
    const handleLike = () => {
      axios.put(`http://localhost:3001/api/post/like/${id}` , {},{headers : {Authorization : `Bearer ${user.token}`}})
        .then(res => {  
        })
        .catch(err => {
          console.log(err)
        })
    }
    const handleLikeComment = (CommentId) => {
      axios.put(`http://localhost:3001/api/comment/like/${CommentId}` , {},{headers : {Authorization : `Bearer ${user.token}`}})
        .then(res => {  
        })
        .catch(err => {
          console.log(err)
        })
    }
  return (
    <>
    <ToastContainer/>
    <div className={`w-full min-h-[100vh] flex flex-col items-center gap-3 `}>
        <div className='w-[550px] p-5 rounded-[10px]'>
        {
          loading ?
                <>     
                  <div className='w-full border-b-[1px] border-white/10 pb-[20px]'>
                    <div className='flex flex-row items-center justify-between w-full'>
                      <div className='flex items-start gap-3'>
                        <Link href={`/pages/user/${post.user._id}`} className='flex flex-row items-center gap-3'>
                            <Image src={post.user.profilePhoto.url} width={100} height={100} className='w-[40px] h-[40px] rounded-full' />
                        </Link>
                        <div className='flex flex-row items-center gap-3'>
                          <span className='text-base text-primary'>{post.user.name}</span>
                          <span className='text-black text-sm'>
                            <Moment fromNow>{post.createdAt}</Moment>
                          </span>
                        </div>
                      </div>
                      <div className='flex relative items-center gap-1'>
                      <span onClick={()=> SetpostMenu(!postMenu)}><BsThreeDots className='text-black' /></span>
                      {
                        user.name == post.user.name ?
                        <div className={`absolute top-4 left-[-20px] w-[200px] bg-black rounded-xl ${postMenu ? "flex" : "hidden"}`}>
                          <div className='flex flex-col items-start w-full'>
                            <div onClick={()=> deletePost(post._id)} className='flex w-full hover:rounded-xl text-red-500 items-center hover:bg-red-500 hover:text-black transition-all duration-700 justify-between p-3'>
                              <span className='text-sm font-black'>Delete</span>
                              <span className='text-sm text-white'><MdDelete/></span>
                            </div>
                          </div>
                        </div> : ""
                      }
                      </div>
                    </div>
                    <h1 className='text-secondary w-[100%] py-[20px] text'>{post.content}</h1>
                      <div className='option flex flex-row items-center gap-1'>
                    <span onClick={handleLike} className={`text-lg `}>
                      {
                        post.likes.includes(user ? user._id : false) ? <FaHeart className='text-red-600' /> : <CiHeart />
                      }
                    </span>
                        <span className={`text-sm text-primary`}>{post.likes.length}</span>
                      </div>
                  </div>
                  <div className='comments'>
                    <div className='w-full flex items-center gap-2 border-b-[1px] py-3 border-white/50'>
                        <input value={textcomment} onChange={(e) => setTextComment(e.target.value)} type="text" placeholder='Write a comment' className='w-[86%] bg-[#181818] outline-none text-white rounded-lg p-2 pl-5'/>
                        <button onClick={handleComment} className='text-white w-[12%] bg-primary rounded-lg p-2'>Add</button>
                    </div>
                    <div className="flex py-3 border-b-[1px] border-white/50  flex-row items-center justify-between w-full">
                        <span className='text-secondary'>Replies</span>
                    <span onClick={() => setAll(!all)} className='text-primary text-sm'>View {all ? "few" : "All"}</span>
                    </div>  
                  <div className='w-full'>
                    {
                      post.comments.map((comment) => {
                        return (
                          <div key={comment._id} className='flex items-start gap-3 py-3 border-b-[1px] border-white/10'>
                            <div className='w-full flex items-start flex-col gap-2'>
                              <div className='flex items-center justify-between w-full'>
                                <div className='flex flex-row items-center gap-3'>
                                  <Link href={`/pages/user/${comment.user._id}`}>
                                    <span className='text-primary text-base'>{comment.username}</span>
                                  </Link>
                                  <span className='text-secondary text-sm'>
                                    <Moment fromNow>{comment.createdAt}</Moment>
                                  </span>
                                </div>
                              </div>
                              <p className='text-black text-sm'>{comment.content}</p>
                              <div className='option flex flex-row items-center gap-1'>
                                <span onClick={() => handleLikeComment(comment._id)} className={`text-lg `}>
                                  {
                                    comment.likes.includes(user ? user._id : false) ? <FaHeart className='text-red-600' /> : <CiHeart className='text-black' />
                                  }
                                </span>
                                <span className='text-sm text-primary'>{comment.likes.length}</span>
                              </div>
                            </div>
                          </div>
                        )
                      }).slice(0 , all ? 1000 : 3 )
                    }
                    </div>
                  </div>
              </>
              
              :
              <div className='flex items-center justify-center w-full min-h-[100vh]'>
                  <div className='w-[80px] itemanimate flex items-center justify-center h-[80px] border-[2px] border-primary rounded-full'></div>
              </div> 
          }
        </div>
    </div>
    </>
  )
}
export default page