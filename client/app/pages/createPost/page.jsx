'use client'
import React from 'react'
import { useState , useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Image from 'next/image'
import { useSelector } from 'react-redux';
const Page = () => {
    const [content, setContent] = useState("")
    const { user } = useSelector((state) => state.auth)
    const handlecontent = (e) => {
        e.preventDefault()
        if (!content) toast.error("Content can't be empty")
        else {
            axios.post("http://localhost:3001/api/post", {
                content
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                }
            })
            .then((res) => {
                console.log(res)
                toast.success("Post Added")
            })
            .catch((err) => {
                console.log(err)
                toast.error("Something went wrong")
            })
        }
    }
return (
    <>
    <ToastContainer />   
    <div className={`w-full min-h-[100vh] flex flex-col items-center gap-3 `}>
        <div className='flex items-center flex-col gap-4 justify-center min-h-[60vh] w-full'>
            <span className='text-xl text-primary font-black uppercase tracking-[3px]'>New Trend</span>
            <form onSubmit={handlecontent} className='md:w-[600px] w-[80%] bg-[#181818] p-8 rounded-xl flex flex-col items-start gap-6'>
                <div className='cre-post flex items-center gap-5 w-full'>
                    <Image width={100} height={100} alt='profilePhoto' src={user.profilePhoto.url}
                            className='w-[50px] h-[50px] rounded-full'/>
                    <input value={content} onChange={(e) => setContent(e.target.value)} type="text" placeholder='What is New ?' className='border-none w-[100%] bg-transparent outline-none text-white' />
                </div>
                <div className='flex items-center justify-between w-full'>
                    <span className='text-sm text-primary'>Post a Trend</span>
                    <button className='border-[1px] border-primary text-sm hover:bg-primary hover:text-white transition-all duration-300 text-primary w-[50px] bg-transparent p-2 rounded-xl'>Post</button>
                </div>
            </form>
        </div>
    </div>
    
    </>
)
}

export default Page