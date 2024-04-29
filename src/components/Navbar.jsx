import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white md:px-40 mx-auto'>
        <div className="flex justify-between h-14 items-center">

     <div className="logo font-bold px-4">
        <span className=' text-green-500'>&lt;</span>
        Pass
        <span className=' text-green-500'>OP/ &gt;</span>

        </div>
     {/* <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="/">About</a>
            <a className='hover:font-bold' href="/">Contact</a>
            
            </li>
       
     </ul> */}
     <button className='text-white bg-green-700 my-2 md:my-5 rounded-full flex items-center justify-between'>
      <img className='w-10 p-1 ' src="/icons/github.png" alt="" />
      <span className="font-bold px-2">Github</span>
      </button>
        </div>
      
    </nav>
  )
}

export default Navbar
