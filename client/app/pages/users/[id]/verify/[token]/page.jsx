'use client'
import { verifyContext } from '@/app/context/VerifyContext';
// import { VerifecationEmail } from '@/app/redux/apiCalls/registercall';
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
const Page = ({ params }) => {
    const { id , token } = params 
    const { verifyStatus, verifyAccount } = useContext(verifyContext)
    useEffect(() => {
        if (!verifyStatus) {
            verifyAccount(id , token)
        }
    },[id , token , verifyStatus])
    // const initail = true
    const isVerify = verifyStatus
    useEffect(() => {
        console.log(verifyStatus , id , token)
    } , [verifyStatus , id , token])
return (
    <>
        <div className='w-full min-h-[100vh] flex flex-col items-center justify-center gap-3'>
            <div className='flex items-center justify-center flex-col gap-6'>
                {
                    isVerify
                        ?
                        <>
                        <span className='text-green-700 text-4xl'><FaCircleCheck /></span>
                        <span className='text-green-700 font-extrabold text-2xl capitalize'>Your Email Is Verified Successfully</span>
                        <Link href={'/'} className='border-[1px] border-primary p-3 w-[200px] bg-transparent text-base font-black text-primary flex items-center justify-center'>Home Page</Link>
                        </>
                        :
                        <>
                            <span className='text-red-700 text-4xl'><IoIosCloseCircleOutline /></span>
                            <span className='text-red-700 font-extrabold text-2xl capitalize'>Your Email Is Not Verified</span>
                        </>
                }
            </div>
        </div>
    </>
)
}

export default Page