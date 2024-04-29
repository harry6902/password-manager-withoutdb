import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col items-center  w-full h-16'>
         <h1 className='text-center font-bold text-2xl'>
                    <span className=' text-green-500'>&lt;</span>
                    Pass
                    <span className=' text-green-500'>OP/ &gt;</span>
                </h1>

                <div className='flex justify-center items-center'>
                    Created With <img className='w-7 mx-1 my-1' src="/icons/love.png" alt="" /> by Harry
                </div>
      
    </div>
  )
}

export default Footer
