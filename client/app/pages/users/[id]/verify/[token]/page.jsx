'use client'
import { VerifecationEmail } from '@/app/redux/apiCalls/registercall';
import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { useDispatch , useSelector } from 'react-redux';
const page = ({ params }) => {
    const dispatch = useDispatch()
    const { isEmailVerify } = useSelector(state => state.register)
    const id = params.id
    const token = params.token
    useEffect(() => {
        dispatch(VerifecationEmail(id , token))
    }, [id, token])
    useEffect(() => {
        console.log(isEmailVerify)
    } , [isEmailVerify])
return (
    <>
        <div className='bg-black w-full min-h-[100vh] flex flex-col items-center justify-center gap-3'>
            <div className='flex items-center justify-center flex-col gap-3'>
                {
                    isEmailVerify 
                        ?
                        <>
                        <span className='text-green-700 text-4xl'><FaCircleCheck /></span>
                        <span className='text-green-700 font-extrabold text-4xl capitalize'>Your Email Is Verified Successfully</span>
                        <Link href={'/Login'} className='border-[1px] border-primary p-3 w-[150px] bg-transparent text-base font-black text-primary flex items-center justify-center'>Login</Link>
                        </>
                        :
                        <>
                        <span className='text-red-700 font-extrabold text-4xl capitalize'>Your Email Is Not Found</span>
                        </>
                }
            </div>
        </div>
    </>
)
}

export default page