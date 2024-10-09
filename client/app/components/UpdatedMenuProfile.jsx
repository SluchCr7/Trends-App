import React from 'react'

const UpdatedMenuProfile = ({updateMenu , handleUpdate , name , setname , setBio ,setnameProfile , bio ,nameProfile}) => {
  return (
    <div className={`updated_menu ${updateMenu ? "flex" : "hidden"}`}>
        <form onSubmit={handleUpdate} className={`flex z-[1000] items-start absolute top-[30%] right-[50%] left-[50%] translate-x-[-50%] flex-col gap-4 w-[500px] border-[1px] border-primary p-5 bg-[#181818] rounded-xl`}>
            <div className='flex items-start flex-col gap-2'>
                <span className='text-sm text-primary font-bold'>UserName</span>
                <input type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder='Username' className='border-none w-[100%] bg-transparent text-white outline-none ' />
            </div>
            <div className='flex items-start flex-col gap-2'>   
                <span className='text-sm text-primary font-bold'>Bio</span>
                <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} placeholder='Bio' className='border-none w-[100%] bg-transparent text-white outline-none ' />
            </div>
            <div className='flex items-start flex-col gap-2'>   
                <span className='text-sm text-primary font-bold'>NickName</span>
                <input type="text" value={nameProfile} onChange={(e) => setnameProfile(e.target.value)} placeholder='NickName' className='border-none w-[100%] bg-transparent text-white outline-none ' />
            </div>
            <button className='w-[100%] p-2 border-[1px] border-primary hover:bg-primary hover:text-white transition-all text-sm duration-300 text-primary bg-transparent rounded-sm'>
                Update
            </button>
        </form>
    </div>
  )
}

export default UpdatedMenuProfile