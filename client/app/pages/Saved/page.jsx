'use client'
import axios from 'axios'
import React, { useEffect , useState } from 'react'
import { useSelector } from 'react-redux'

const page = () => {
  let { user } = useSelector(state => state.auth)
  const [data, setData] = useState([])
  
  useEffect(() => {
    axios.get(`http://localhost:3001/api/post/${user.savedPosts[num]}`)
    .then(res => {
      setData(res.data)
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  })
  return (
    <div className='flex flex-col mt-14 items-center justify-center w-full'>
        <span className='text-primary mb-2 font-extrabold uppercase'>Saved Posts</span>
        <div className='flex flex-col items-start gap-2'>
            
        </div>
    </div>
  )
}

export default page