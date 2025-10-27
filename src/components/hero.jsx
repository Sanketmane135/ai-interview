'use client'
import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react";

function Hero() {

   const { data: session, status } = useSession();
  const handlestart=(e)=>{
    e.preventDefault();
    if(!session){
      signIn();
    }
    else{
      window.location.href="/interview"
    }
  }


  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white h-screen flex items-center justify-center">

  <div className="text-center px-4">
    
    <p className="text-blue-400 uppercase tracking-widest text-sm mb-4">
      AI-Powered Interview Preparation
    </p>

    
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
      Ace Your Next <span className="text-blue-500">Interview with AI</span>
    </h1>


    <p className="text-gray-300 text-lg sm:text-xl mb-8">
      Upload your resume and practice tailored interview questions powered by AI. Get instant feedback and boost your confidence.
    </p>

    
    <div className="w-full flex flex-col sm:flex-row justify-center gap-4">
      <button onClick={handlestart} className="sm:w-10 md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
        Get Started
      </button>
     
    </div>
  </div>

</div>
  )
}
  
export default Hero