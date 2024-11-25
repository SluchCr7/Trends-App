import React from 'react'

const UpdatePost = ({postUpdate , handleEdit , content ,setContent}) => {
  return (
    <div className={`updated_menu ${postUpdate ? "flex" : "hidden"} postUpdate`}>
        <form action="" onSubmit={handleEdit} className={`flex z-[1000] items-start absolute top-[30%] right-[50%] left-[50%] translate-x-[-50%] flex-col gap-4 w-[85%] md:w-[450px] border-[1px] border-primary p-5 bg-[#181818] rounded-xl`}>
            <label htmlFor="" className='text-sm text-primary font-bold'>Content</label>
            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder='Update Text' className='border-none w-[100%] bg-transparent text-white outline-none '  />
            <button className='w-full md:w-[400px] bg-primary p-3 rounded-md'>Update</button>
        </form>
    </div> 
  )
}

export default UpdatePost