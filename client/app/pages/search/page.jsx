'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { useSelector } from 'react-redux'
const page = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [data, setData] = useState([])
  const {user} = useSelector(state => state.auth)
  useEffect(() => {
    console.log(searchQuery)
  }, [searchQuery])
  const handleChange = (query) => {
    axios.get('http://localhost:3001/api/auth/Users/search', {
      params : {name :query}
    })
      .then(res => {
        setData(res.data)
        console.log(res.data)
      })
      .catch(err=> console.log(err))
  }
  const handleInput = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    if (query.trim() !== '') {
      handleChange(query)
    }
    else {
      setData([])
    }
  }
  return (
    <div className='w-full min-h-[100vh] flex flex-col items-center gap-3'>
      <div className='w-[650px]  h-[100vh] p-5 rounded-[10px]'>
        <input value={searchQuery} onChange={handleInput}
          type="text" placeholder='Search'
          className='w-[100%] bg-[#949494] outline-none text-black rounded-lg p-2 pl-5'
        />
        <div className='w-full bg-[#949494] min-h-[100vh] p-4 mt-3 rounded-lg flex flex-col items-start gap-2'>
          {
            data.length > 0 ?
            data.map((userAcc) => {
              return(
                <>
                  <Link href={user ?user._id ==userAcc._id ? `/pages/Profile/${userAcc._id}` : `/pages/user/${userAcc._id}` : `/pages/user/${userAcc._id} `} className='flex items-center flex-row gap-3 w-full hover:bg-[#181818] transition-all duration-700 p-3'>
                    <Image src={userAcc.profilePhoto.url} width={100} height={100} 
                      className='w-[50px] h-[50px] rounded-full' />
                      <div className='flex items-start gap-1 flex-col'>
                        <span className='text-secondary font-bold text-sm'>{userAcc.name}</span>
                        <span className='text-xs text-primary'>{userAcc.nameProfile}</span>
                      </div>
                  </Link>
                </>
              )
            })
              : <span className='flex items-center justify-center min-h-[70vh] w-full uppercase text-secondary text-2xl'>No items Found</span>
          }
        </div>
      </div>
    </div>
  )
}

export default page