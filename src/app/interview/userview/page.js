'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams  } from 'next/navigation';
import {useRouter} from 'next/navigation';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
    
       

function page() {

const listening= ()=>SpeechRecognition.startListening({ continuous: true, language:'en-IN' });
    
 const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const router=useRouter();

    if (!browserSupportsSpeechRecognition) {
    return null
  }
    const searchparams=useSearchParams();
    const constUsername=searchparams.get("fullname");
    const jobrole=searchparams.get("jobrole");
    const experience=searchparams.get("experience");
    const questionlevel=searchparams.get("questionlevel");
    const questions=searchparams.get("questions");
    const locationpreference=searchparams.get("locationpreference");

    const [isActive, setIsActive]=useState(false);

    const missing = !constUsername || !jobrole || !experience || !questionlevel || !questions || !locationpreference;    

     const [messages, setMessages] = useState([
            {
            role: "ai",
            text: "Hi! I'm your AI SEO assistant. I can help you with keyword research, content optimization, and SEO strategy. What would you like to work on today?",
            },
        ])
        const [input, setInput] = useState("")
        const chatEndRef = useRef(null)

       

        const sendMessage = () => {
            if (!input.trim()) return
            setMessages([...messages, { role: "user", text: input }])
            setInput("")
            }
  return (
    <div className='w-full bg-black  md:p-4'>
        {
          missing?(
            <div className=" w-full h-screen content-center  text-center space-y-4">
                
                <p className="text-red-500 text-lg font-semibold">
                     Some required values are missing!
                </p>
                <button
                    onClick={() => router.push("/interview")}
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Back to Home
                </button>
            </div>
          ):(

            <div className="min-h-screen bg-black text-gray-100 md:p-6">
            {/* Header */}
            <div className="w-full flex  md:flex-row gap-2 flex-col justify-between items-center mb-6 bg-gray-900 p-4 rounded-lg shadow">

                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
                        SJ
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{constUsername}</h2>
                        <div className="flex gap-2 mt-1 md:text-sm text-[10px] text-gray-300">
                            <span className="bg-gray-900 border border-gray-700 px-2 py-1 rounded">Job Role: {jobrole}</span>
                            <span className="bg-gray-900 border border-gray-700  px-2 py-1 rounded">{experience} Years of experince</span>
                        </div>
                    </div>
                </div>

                    <div className={`text-sm text-start flex items-center gap-2 ${isActive?"text-green-500":"text-red-700"}   font-medium`}>
                        {isActive?(<><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0ab835"><path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"/></svg>
                        Interview Active</>):(<><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"/></svg>
                        Not Active</>)}
                        
                    </div>
            </div>

            {/* Main content */}
              <div className="bg-black flex items-center justify-center md:p-6">
                <div className="w-full  rounded-lg shadow-lg border border-gray-800 bg-gray-900 flex flex-col">
                    
                    {/* Header */}
                    <div className="p-6 border-b border-gray-700">
                    <h1 className="text-2xl font-bold text-white">AI Interview</h1>
                    <p className="text-gray-400">Give your answers to AI Interviewer</p>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-800 min-h-[400px] max-h-[400px]">
                    {/* Empty space at top (for breathing room) */}
                   

                   {messages.map((msg, idx) => (
                        <div
                            ref={chatEndRef}
                            key={idx}
                            className={`w-auto max-w-[80%] px-4 py-2 rounded-lg ${
                            msg.role === "ai"
                                ? "bg-gray-700 text-white self-start"
                                : "bg-blue-600 text-white self-end ml-auto"
                            }`}
                        >
                            {msg.text}
                        </div>
                        ))}

                    
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-gray-700 flex items-center gap-2 bg-gray-900">
                    {/* <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything about SEO..."
                        className="flex-1 px-4 py-2 rounded-lg bg-black text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    /> */}
                    
                    <div className="h-10 flex-1 px-4 py-2 rounded-lg bg-black text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                       {transcript} 
                    </div>
                    <button
                        onClick={listening}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        speak
                    </button>
                    <button onClick={()=>{SpeechRecognition.stopListening()}}>stop</button>
                    </div>
                </div>
                </div>

            
             </div>
          )
        }
        
    </div>
  )
}

export default page