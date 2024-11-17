'use client'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
const axios = require('axios')
import { BsThreeDots } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";
import Menuoptions from '@/app/components/Menuoptions';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import AccountInfo from '@/app/components/AccountInfo';
import { likeContext } from '@/app/context/LikeContext';
const page = (props) => {
    const id = props.params.id
    const [user, setUser] = useState({})
    const [menu , setMenu] = useState(false)
    const [loading, setLoading] = useState(false)
    const UserAccount = useSelector((state) => state.auth)
    const [openMenu , setopenMenu] = useState(false)
    const [follow , setFollow] =  useState("Follow")
    const [info, setInfo] = useState(false)
    const { HandleLike } = useContext(likeContext)
    useEffect(() => {
        axios.get(`http://localhost:3001/api/auth/${id}`)
        .then(res => {
            setUser(res.data)
            console.log(res.data)
            setLoading(true)
        })
        .catch(err => console.log(err))
    }, [user])
    const handleFollow = () => {
        axios.put(`http://localhost:3001/api/auth/follow/${id}`, {}, { headers: { Authorization: `Bearer ${UserAccount.user.token}` } })
        .then(res => {
            if(follow == "Follow"){
                setFollow("UnFollow")
            }
            else{
                setFollow("Follow")
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <>
        <AccountInfo name={user.name} bio={user.bio} info={info} nameProfile={user.nameProfile} date={user.createdAt} img={user?.profilePhoto?.url} />
        <div className={`w-full min-h-[100vh] flex flex-col items-center gap-3`}>
            <div className='md:w-[650px] w-[80%] h-[100vh] p-5 rounded-[10px]'>
                {   loading ?
                    <>
                        <div className='flex flex-col items-start gap-6 w-full' key={user._id}>
                            <div className='flex md:flex-row flex-col-reverse gap-2 items-center justify-between md:justify-between w-full'>
                                <div className='flex flex-col items-center md:items-start gap-1'>
                                    <span className='text-black text-xl'>{user.name}</span>
                                    <span className='text-primary text-sm'>{user.nameProfile}</span>
                                </div>
                                <Image src={user.profilePhoto.url} alt={"img"} width={70} height={70} className='rounded-full w-[80px] h-[80px]' />
                            </div>
                            <div className='w-full'>
                                <span className='text-black text-sm'>{user.bio}</span>
                            </div>
                            <div className='w-full flex flex-row items-center justify-between'>
                                <span className='text-secondary text-base'>{user.followers.length} follower</span>
                                <div className='relative'>
                                    <span onClick={() => setMenu(!menu)} className='text-secondary text-xl hover:text-primary duration-500 transition-all'><CgMoreO /></span>
                                        <Menuoptions menu={menu} setInfo={setInfo} setMenu={setMenu} setopenMenu={setopenMenu} openMenu={openMenu} />
                                </div>
                            </div>
                            {
                            UserAccount.user ?
                                <button onClick={handleFollow} className={`w-[100%] p-2 border-[1px] border-primary hover:bg-primary hover:text-white transition-all text-sm duration-300 text-primary bg-transparent rounded-xl`}>
                                    {
                                        user.followers.includes(UserAccount.user._id) ? "Un Follow" : "Follow"
                                    }
                                </button>
                                    :
                                        ""
                            }
                            <div className='w-full pt-3 flex flex-col '>
                                <div className='w-full flex flex-row items-center border-b-[1px] border-white/10 justify-around gap-12 pb-1'>
                                    <div className='w-[50%] hover:bg-accent-hover transition-all duration-500 p-3 flex items-center justify-center'>
                                        <span className={`text-primary font-black capitalize `}>Threads</span>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex flex-col items-start'>
                                {
                                    user.posts.map((post) => {
                                        return (
                                            <>
                                                <div key={post._id} className='w-full flex flex-col items-start border-b-[1px] border-white/10 py-3'>
                                                    <div className='w-full flex flex-col items-start gap-2'>
                                                        <div className='flex flex-row items-start w-full justify-between gap-3'>
                                                            <div className='flex flex-row items-start gap-2'>
                                                                <Image src={user.profilePhoto.url} alt={"img"} width={40} height={40} className='rounded-full w-[40px] h-[40px]' />
                                                                <div className='flex flex-col items-start gap-1'>
                                                                    <span className='text-black text-sm'>{user.name}</span>
                                                                    <span className='text-secondary text-xs'>
                                                                    <Moment fromNow>
                                                                    {post.createdAt}
                                                                    </Moment></span>
                                                                </div>
                                                            </div>
                                                            <span className='text-secondary'><BsThreeDots /></span>
                                                        </div>
                                                        <span className='text-black text-sm w-[100%] text'>{post.content}</span>
                                                        <div className='flex flex-row items-center gap-6'>
                                                            <div onClick={ ()=> HandleLike(post._id) } className='option flex flex-row items-center gap-2'>
                                                                <span className=''>
                                                                    {
                                                                        
                                                                        post.likes.includes(UserAccount.user ? UserAccount.user._id : false)
                                                                                ? <FaHeart className='text-red-600' />
                                                                                : <CiHeart className='text-black' />
                                                                    }
                                                                </span>
                                                                <span className='text-sm text-primary'>{post.likes.length}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        </>
                        :<div className='flex items-center justify-center w-full min-h-[100vh]'>
                            <div className='w-[80px] itemanimate flex items-center justify-center h-[80px] border-[2px] border-primary rounded-full'></div>
                        </div> 
                }
            </div>
        </div>
    </>
  )
}
export default page