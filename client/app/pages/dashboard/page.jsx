'use client'
import React, { useState } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa6";
import Box from './Box';
import Link from 'next/link'
import { useEffect } from 'react';
import axios from 'axios';

const page = () => {
    const [Users, setUsers] = useState([])
    const [Posts, setPosts] = useState([])
    const [Comments , setComment] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3001/api/auth")
        .then(res => {
            setUsers(res.data)
        })
        .catch(err=> console.log(err))
    },[Users])
    useEffect(() => {
        axios.get("http://localhost:3001/api/post")
            .then(res => {
                setPosts(res.data)
            })
            .catch(err=> console.log(err))
    },[Posts])
    useEffect(() => {
        axios.get("http://localhost:3001/api/comment")
            .then(res => {
                setComment(res.data)
            })
            .catch(err=> console.log(err))
    },[Comments])
    return (
        <div className='dash w-[100%] min-h-[100vh] flex flex-col items-start pl-[14%] pt-8'>
            <h1 className='text-2xl text-primary font-bold uppercase'>Dashboard</h1>
            <div className='grid w-full grid-cols-1 md:grid-cols-3 gap-4 my-4'>
                <Link href={`/pages/dashboard/pages/user`} className={`md:w-[400px] w-[75%] bg-[#0353a4] rounded-[10px] flex flex-col items-start gap-6 p-5`}>
                    <div className='flex flex-row items-center justify-between w-full'>
                        <span className='text-base text-white font-bold'>Users</span>
                        <span className='text-xl text-white font-bold'><FaCircleUser /></span>
                    </div>  
                    <span className='text-xl text-white font-bold'>{Users.length}</span>
                </Link>
                <Link href={`/pages/dashboard/pages/posts`} className={`md:w-[400px] w-[75%] bg-[#880d1e] rounded-[10px] flex flex-col items-start gap-6 p-5`}>
                    <div className='flex flex-row items-center justify-between w-full'>
                        <span className='text-base text-white font-bold'>Posts</span>
                        <span className='text-xl text-white font-bold'><FiEdit /></span>
                    </div>  
                    <span className='text-xl text-white font-bold'>{Posts.length}</span>
                </Link>
                <Link href={`/pages/dashboard/pages/comments`} className={`md:w-[400px] w-[75%] bg-[#5a189a] rounded-[10px] flex flex-col items-start gap-6 p-5`}>
                    <div className='flex flex-row items-center justify-between w-full'>
                        <span className='text-base text-white font-bold'>Comments</span>
                        <span className='text-xl text-white font-bold'><FaRegComment /></span>
                    </div>  
                    <span className='text-xl text-white font-bold'>{Comments.length}</span>
                </Link>
            </div>
        </div>
    )
}

export default page