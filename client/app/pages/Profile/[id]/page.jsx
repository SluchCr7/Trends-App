'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import UpdatedMenuProfile from '@/app/components/UpdatedMenuProfile'
import { CgMoreO } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";
import { Postcontext } from '@/app/context/PostContext'
import { ToastContainer, toast } from 'react-toastify';
import {useSelector , useDispatch} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { ProfileGetData} from '@/app/redux/apiCalls/profilecall'
import swal from 'sweetalert'
import axios from 'axios';
import AccountInfo from '@/app/components/AccountInfo'
import PostProfile from '../../../components/PostProfile'
import PostPin from '@/app/components/PostPin';
import Loading from '@/app/components/Loading';
const Page = ({ params }) => {
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
    const [content, setContent] = useState("")
    const [info, setInfo] = useState(false)
    const {trends} = useContext(Postcontext)
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
        date={profile?.createdAt} info={info} setInfo={setInfo}
    />
    <UpdatedMenuProfile updateMenu={updateMenu}
            handleUpdate={handleUpdate}
            name={name} setname={setname}
            bio={bio} setBio={setBio}
        nameProfile={nameProfile} setnameProfile={setnameProfile}
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
                        <p className={`text-sm text-black text-center md:text-left ${content.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/)?"text": ""} font-bold`}>{profile?.bio}</p>
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
                            <span className='text-lg text-primary font-bold tracking-[5px] uppercase'>Trends</span>
                        </div>
                            <div className='posts relative flex flex-col items-start gap-2 w-full'> 
                            {
                                profile?.posts?.map((post) => ( 
                                    post.pinPost
                                    && 
                                    <PostPin _id={post._id} content={post.content} createdAt={post.createdAt} likes={post.likes} />
                                ))
                            }   
                            {   
                                profile?.posts?.map((post) => (
                                    post.pinPost == false 
                                    &&
                                    <PostProfile post={post}/>
                                ))
                            }
                        </div>
                    </div>
                    )   
                :
                <Loading />
            }
        </div>
    </div>
    </>
  )
}

export default Page