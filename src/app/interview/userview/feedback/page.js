'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

function Page() {
    const router=useRouter();

    const[feedBackdata,setFeedbackData]=useState([]);

    useEffect(() => {
      try {
        const stored = JSON.parse(localStorage.getItem("feedback") || "[]");
        setFeedbackData(stored);
      } catch (error) {
        
      }
    }, [])
    

  return (
    <div className='w-full'>
        {
            feedBackdata.length<=0
            ?
            (<div className='w-full h-screen flex items-center justify-center'>loading</div>):(
            <div className="bg-gray-700 min-h-screen flex flex-col items-center p-6">
                {/* Top Badge */}
                <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
                    ✓ Assessment Complete
                </div>

                {/* Heading */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mt-4">
                    Your Results Are Ready
                </h1>
                <p className="text-gray-200 mt-2 text-center max-w-xl">
                    Based on your responses to our AI-powered leadership style assessment
                </p>
                <div className="flex  flex-col md:flex-row gap-5  w-full mt-6">
                {/* Collaborative Leader Card */}
                    <div className="w-full max-w-3xl bg-gray-500 rounded-xl shadow-md p-6 md:p-10 mt-8 border border-gray-400">
                        <div className="text-center">
                        <p className="text-gray-200 text-lg">✨ You are a</p>
                        <h2 className="text-2xl md:text-3xl font-bold text-green-400">
                            Collaborative Leader
                        </h2>
                        
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Strengths */}
                        <div>
                            <h3 className="text-green-600 font-semibold text-lg flex items-center gap-2 bg-green-100 p-2 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#0ab835"><path d="M160-240v-66.67h276L82.67-660l46.66-46.67 350 349.67 225.34-224.67q-5.34-10.33-8.34-21.83-3-11.5-3-23.17 0-39.33 27-66.33t66.34-27Q826-720 853-693t27 66.33q0 39.34-27 66.34t-66.33 27q-8.34 0-15.5-1.17-7.17-1.17-15.17-4.17l-232 232h276V-240H160Z"/></svg> Your Strengths
                            </h3>
                            <ul className="mt-3 space-y-2 text-gray-700 list-disc list-inside">
                                {
                                    feedBackdata.strengths.map((v,i)=>{
                                        return(
                                            <li key={i}>{v}</li>
                                        )
                                    })

                                }
                            
                            
                            </ul>
                        </div>

                        {/* Growth Opportunities */}
                        <div>
                            <h3 className="text-yellow-600 font-semibold text-lg flex items-center gap-2 bg-amber-100 p-2 rounded">
                             <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#F19E39"><path d="M726.67-486.67v-176.66l-70.67 70L609.33-640 760-790.67 910.67-640 864-592.33 793.33-663v176.33h-66.66ZM40-80l240-320 190 253.33h316.67L560-448 443.33-293.33l-42-55.34L560-560 920-80H40Zm403.33-66.67Z"/></svg>Growth Opportunities
                            </h3>
                            <ul className="mt-3 space-y-2 text-gray-700 list-disc list-inside">
                            {
                                    feedBackdata.growth_opportunities.map((v,i)=>{
                                        return(
                                            <li key={i}>{v}</li>
                                        )
                                    })

                                }
                            </ul>
                        </div>
                        </div>
                    </div>

                    {/* Detailed Analysis */}
                    <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6 md:p-8 mt-8 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        📊 Detailed Analysis
                        </h3>

                        <div className="mt-6 space-y-5">
                        {/* Communication */}
                        <div>
                            <div className="flex justify-between mb-1">
                            <span className="text-gray-700">Communication</span>
                            <span className="text-gray-600 font-medium">{feedBackdata.skills.communication}%</span>
                            </div>
                            <div className="w-full bg-blue-100 rounded-full h-2.5">
                            <div className={`bg-blue-600 h-2.5 rounded-full w-[${feedBackdata.skills.communication}%]`}></div>
                            </div>
                        </div>

                        {/* Strategy */}
                        <div>
                            <div className="flex justify-between mb-1">
                            <span className="text-gray-700">Strategy</span>
                            <span className="text-gray-600 font-medium">{feedBackdata.skills.strategy}%</span>
                            </div>
                            <div className="w-full bg-blue-100 rounded-full h-2.5">
                            <div className={`bg-blue-600 h-2.5 rounded-full w-[${feedBackdata.skills.strategy}%]`}></div>
                            </div>
                        </div>

                        {/* Teamwork */}
                        <div>
                            <div className="flex justify-between mb-1">
                            <span className="text-gray-700">Teamwork</span>
                            <span className="text-gray-600 font-medium">{feedBackdata.skills.teamwork}%</span>
                            </div>
                            <div className="w-full bg-blue-100 rounded-full h-2.5">
                            <div className={`bg-blue-600 h-2.5 rounded-full w-[${feedBackdata.skills.teamwork}%]`}></div>
                            </div>
                        </div>

                        {/* Adaptability */}
                        <div>
                            <div className="flex justify-between mb-1">
                            <span className="text-gray-700">Adaptability</span>
                            <span className="text-gray-600 font-medium">{feedBackdata.skills.adaptability}%</span>
                            </div>
                            <div className="w-full bg-blue-100 rounded-full h-2.5">
                            <div className={`bg-blue-600 h-2.5 rounded-full w-[${feedBackdata.skills.adaptability}%]`}></div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                {/* AI-Generated Insights */}
                <div className="w-full  bg-white rounded-xl shadow-md p-6 md:p-8 mt-8 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    🤖 AI-Generated Insights
                    </h3>

                    <div className="mt-6 space-y-5">
                    {/* Leadership DNA */}
                    {
                        feedBackdata.answers_feedback.map((v,i)=>{
                            return(
                                <div key={i}>
                                    <h4 className="font-semibold text-gray-700">
                                        <span className='text-orange-600'>Que.</span> {v.question}
                                    </h4>
                                    <p className="text-gray-600 text-sm mt-1">
                                        <span className='text-blue-500'>Your Ans:</span> {v.answer}
                                    </p>
                                    <p className="text-gray-600 text-sm mt-1">
                                        <span className='text-green-700'>Answer Feedback: </span> {v.feedback}
                                    </p>
                                </div>
        
                            )
                        })
                    }
                
                

                
                    </div>
                    
                </div>

                <button onClick={()=>{router.push("/")}} className='text-white bg-blue-500 rounded p-2 mt-2'>Go to home page</button>
            </div>
                )
        }
        
    </div>
  )
}

export default Page