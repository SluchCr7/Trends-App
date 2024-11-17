'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import UpdatedMenuProfile from '@/app/components/UpdatedMenuProfile'
import UpdatePost from '@/app/components/UpdatePost'
import Link from 'next/link'
import { FaHeart } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import {useSelector , useDispatch} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { ProfileGetData, UploadNewProfilePhoto} from '@/app/redux/apiCalls/profilecall'
import swal from 'sweetalert'
import axios from 'axios';
import Moment from 'react-moment';
import AccountInfo from '@/app/components/AccountInfo'
import { Postcontext } from '@/app/context/PostContext'
import { likeContext } from '@/app/context/LikeContext'
const page = ({ params }) => {
    const { user } = useSelector(state => state.auth)
    const Id = params.id
    const dispatch = useDispatch()
    const {profile} = useSelector(state => state.profile)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [menu, setMenu] = useState(false)
    const [name, setname] = useState(profile?.name)
    const [bio, setBio] = useState(profile?.bio)
    const [nameProfile, setnameProfile] = useState(profile?.nameProfile)
    const [updateMenu, setUpdateMenu] = useState(false)
    const [postUpdate, setPostUpdate] = useState(false)
    const [content, setContent] = useState("")
    const [postId, setPostId] = useState("")
    const [info, setInfo] = useState(false)
    const { deletePost } = useContext(Postcontext)
    const { HandleLike } = useContext(likeContext)
    useEffect(() => {
        dispatch(ProfileGetData(Id))
        setLoading(true)
    }, [Id])
    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3001/api/auth/profile/${user?._id}`, {
            name,
            bio,
            nameProfile
        },{
            headers: {  
                "Authorization" : `Bearer ${user?.token}`
            }
        })
            .then((res) => {    
                if (res.status === 200) {
                    setUpdateMenu(false)
                    toast.success("Profile Updated")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const deleteAccount = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this account!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:3001/api/auth/${user?._id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization" : `Bearer ${user?.token}`
                    }
                })
                    .then((res) => {
                        if (res.status === 200) {
                            localStorage.removeItem("UserInfo")
                            window.location.href = "/"
                        }
                    })
                    .catch((err) => {   
                        console.log(err)
                    })
            }   
        });
    }
    // const deletePost = (PostId) => {
    //     swal({
    //         title: "Are you sure?",
    //         text: "Once deleted, you will not be able to recover this post!",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //     })
    //     .then((willDelete) => {
    //         if (willDelete) {
    //             axios.delete(`http://localhost:3001/api/post/${PostId}`, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization" : `Bearer ${user?.token}`
    //                 }
    //             })
    //                 .then((res) => {
    //                     if (res.status === 200) {
    //                         window.location.reload()
    //                     }
    //                 })
    //                 .catch((err) => {   
    //                     console.log(err)
    //             })
    //         }   
    //     });
    // }
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
    const UpdatePhoto = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('image', image); 
            // dispatch(UploadNewProfilePhoto(formData))
            try {
                // Send POST request to upload file to the server
                const response = await axios.post('http://localhost:3001/api/auth/photo', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization" : `Bearer ${user?.token}`
                    },
                })
                    .then(res => {
                        toast.success("Uploading Image Successfully")
                        // localStorage.setItem("profilePhoto" , JSON.stringify(res.data))
                    localStorage.setItem("UserInfo" , JSON.stringify({...user , profilePhoto : res.data}))
                    // dispatch(UploadNewProfilePhoto(res.data))
                })
                console.log(response.data);
            } catch (error) {
                console.error('Error uploading the file:', error);
            }
    }

return (
    <>
    <ToastContainer />
    <AccountInfo img={profile?.profilePhoto.url}
        name={profile?.name} bio={profile?.bio}
        nameProfile={profile?.nameProfile}
        date={profile?.createdAt} info={info}
    />
    <UpdatedMenuProfile updateMenu={updateMenu}
            handleUpdate={handleUpdate}
            name={name} setname={setname}
            bio={bio} setBio={setBio}
        nameProfile={nameProfile} setnameProfile={setnameProfile}
    />
    <UpdatePost postUpdate={postUpdate}
        handleEdit={handleEdit} setContent={setContent} content={content}
    />
    <div className={`w-full min-h-[100vh] flex flex-col items-center gap-3`}>
        <div className='md:w-[650px] w-[80%] h-[100vh] p-5 py-8 rounded-[10px]'>
        {
            loading ? 
                (
                    <div className='flex flex-col items-start gap-5'>
                        <div className='flex w-full flex-col-reverse md:flex-row items-center justify-center md:justify-between'>
                            <div className='flex flex-col items-center md:items-start gap-1'>
                                <span className='text-xl text-primary font-bold'>{profile?.name}</span>
                                <span className='text-sm text-secondary font-bold'>{profile?.nameProfile}</span>
                            </div>
                            <div className='relative'>
                                <form action="" onSubmit={UpdatePhoto}>
                                    <label htmlFor="file">
                                        <Image src={image ? URL.createObjectURL(image) : profile?.profilePhoto.url} alt='profile' width={80} height={80} className='rounded-full' />
                                    </label>
                                    <input type="file" id='file' 
                                        className='hidden'
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                    <button type='submit'
                                        className='text-black text-xs hover:text-primary duration-500 transition-all border-[1px] mt-4 ml-[10px] border-primary rounded-full px-2 py-1'>
                                        Upload
                                    </button>
                                </form>
                            </div>
                        </div>
                        <p className='text-sm text-black text-center md:text-left font-bold'>{profile?.bio}</p>
                        <div className='w-full flex items-center justify-between'>
                            <span className='text-sm text-primary font-bold'>{profile?.followers.length} <span className='font-black'>Follower</span></span>
                            <div className='relative'>
                                <span onClick={() => setMenu(!menu)} className='text-black text-xl hover:text-primary duration-500 transition-all'><CgMoreO /></span>
                                <div className={`${menu ? 'flex' : 'hidden'} flex-col items-start w-[200px] border-[1px] border-primary absolute top-[3.25rem] left-[-10rem] bg-[#181818] z-50`}>
                                    <div  className='flex flex-row w-full justify-between p-3 items-center hover:bg-[#404040] transition-all duration-700'>
                                        <span className='text-sm text-primary font-bold'>Copy Link</span>
                                        <span className='text-sm text-primary font-bold'><IoIosLink /></span>
                                    </div>
                                    <div onClick={()=> setInfo(!info)}  className='flex flex-row w-full justify-between p-3 items-center hover:bg-[#404040] transition-all duration-700'>
                                        <span className='text-sm text-primary font-bold'>Account Info</span>
                                        <span className='text-sm text-primary font-bold'><CiCircleInfo /></span>
                                    </div>
                                    <div className='flex flex-row w-full justify-between p-3 items-center hover:bg-[#404040] transition-all duration-700' onClick={()=> setUpdateMenu(true)}>
                                        <span className='text-sm text-primary font-bold'>Edit Profile</span>
                                        <span className='text-sm text-primary font-bold'><MdOutlineEdit /></span>
                                    </div>
                                    <div onClick={deleteAccount} className='flex flex-row w-full justify-between p-3 items-center hover:bg-[#404040] transition-all duration-700'>
                                        <span className='text-sm text-primary font-bold'>Delete Profile</span>
                                        <span className='text-sm text-primary font-bold'><MdDelete /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full border-b-[1px] border-black pb-3 flex items-center justify-center'>
                            <span className='text-base text-primary font-bold capitalize'>Trends</span>
                        </div>
                        <div className='posts flex flex-col items-start gap-2 w-full'> 
                            {
                                profile?.posts?.map((post) => (
                                    <div  key={post._id} className='w-full border-b-[1px] border-[#404040] pb-5'>
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
                                                    <div className='relative flex items-center gap-2'>
                                                        <span onClick={() => {
                                                            setPostUpdate(true)
                                                            setPostId(post._id)
                                                        }}><MdOutlineEdit className='text-xl text-primary' /></span>
                                                        <span onClick={() => deletePost(post._id)}><MdDelete className='text-xl text-primary cursor-pointer' /></span>
                                                    </div>
                                                </div>
                                                <Link href={`/pages/post/${post?._id}`} className='text-sm text-black font-bold'>{post.content}</Link>
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
                                ))
                            }
                        </div>
                    </div>
                )
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