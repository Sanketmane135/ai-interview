'use client'
import React from 'react'
function Navbar() {

  return (

      <nav className="w-full fixed top-0 left-0 z-50 bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-between px-6 md:pl-40 md:pr-40 md:py-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-xs font-bold">R</span>
          </div>
          <span className="font-medium text-lg text-white">ResumeIQ</span>
        </div>

        <div className='md:flex gap-5 text-sm md:text-lg hidden'>
          <a className='text-gray-200 cursor-pointer hover:text-gray-50 hover:border-b-1 hover:transition'>
            Features
          </a>

          <a className='text-gray-200 cursor-pointer hover:text-gray-50 hover:border-b-1'>
            How it Works
          </a>

          <a className='text-gray-200 cursor-pointer hover:text-gray-50 hover:border-b-1'>
            Reviews
          </a>
        </div>


        {/* Links */}
        <div className="flex items-center gap-8 text-lg">
          <a href="/#" className="text-gray-200 hover:text-white transition pl-2 pr-2 bg-blue-500 hover:bg-blue-600 rounded"> 
            Sign In
          </a>
          
        </div>
      </nav>
     

  )
}

export default Navbar