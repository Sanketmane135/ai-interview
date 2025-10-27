'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { ArrowRightToLine } from 'lucide-react';

function Page() {
    const router=useRouter();

    const[feedBackdata,setFeedbackData]=useState([]);

    useEffect(() => {
      try {
        const stored = JSON.parse(sessionStorage.getItem("feedback") || "[]");
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
                
                <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
                    ✓ Assessment Complete
                </div>

               
                <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mt-4">
                    Your Results Are Ready
                </h1>
                <p className="text-gray-200 mt-2 text-center max-w-xl">
                    Based on your responses to our AI-powered leadership style assessment
                </p>
                <div className="flex  flex-col md:flex-row gap-5  w-full mt-6">
               
                    <div className="w-full max-w-3xl bg-gray-500 rounded-xl shadow-md p-6 md:p-10 mt-8 border border-gray-400">
                        <div className="text-center">
                        <p className="text-gray-200 text-lg">✨ You are a</p>
                        <h2 className="text-2xl md:text-3xl font-bold text-green-400">
                            Collaborative Leader
                        </h2>
                        
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                      
                        <div>
                            <h3 className="text-green-600 font-semibold text-lg flex items-center gap-2 bg-green-100 p-2 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#0ab835"><path d="M160-240v-66.67h276L82.67-660l46.66-46.67 350 349.67 225.34-224.67q-5.34-10.33-8.34-21.83-3-11.5-3-23.17 0-39.33 27-66.33t66.34-27Q826-720 853-693t27 66.33q0 39.34-27 66.34t-66.33 27q-8.34 0-15.5-1.17-7.17-1.17-15.17-4.17l-232 232h276V-240H160Z"/></svg> Your Strengths
                            </h3>
                            <ul className="mt-3 space-y-2 text-gray-700 list-disc list-inside">
                                {
                                    feedBackdata.strengths.map((v,i)=>{
                                        return(
                                            <li className='text-white' key={i}>{v}</li>
                                        )
                                    })

                                }
                            
                            
                            </ul>
                        </div>

                       
                        <div>
                            <h3 className="text-yellow-600 font-semibold text-lg flex items-center gap-2 bg-amber-100 p-2 rounded">
                             <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#F19E39"><path d="M726.67-486.67v-176.66l-70.67 70L609.33-640 760-790.67 910.67-640 864-592.33 793.33-663v176.33h-66.66ZM40-80l240-320 190 253.33h316.67L560-448 443.33-293.33l-42-55.34L560-560 920-80H40Zm403.33-66.67Z"/></svg>Growth Opportunities
                            </h3>
                            <ul className="mt-3 space-y-2 text-gray-700 list-disc list-inside">
                            {
                                    feedBackdata.growth_opportunities.map((v,i)=>{
                                        return(
                                            <li className='text-white' key={i}>{v}</li>
                                        )
                                    })

                                }
                            </ul>
                        </div>
                        </div>
                    </div>

                    
                    <div className="w-full max-w-3xl bg-gray-500 rounded-xl shadow-md p-6 md:p-8 mt-8 border border-gray-200">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#F3F3F3"><path d="M253.33-293.33H520V-360H253.33v66.67Zm386.67 0h66.67v-373.34H640v373.34ZM253.33-446.67H520v-66.66H253.33v66.66Zm0-153.33H520v-66.67H253.33V-600Zm-112 480q-27 0-46.83-19.83-19.83-19.84-19.83-46.84v-586.66q0-27 19.83-46.84Q114.33-840 141.33-840h677.34q27 0 46.83 19.83 19.83 19.84 19.83 46.84v586.66q0 27-19.83 46.84Q845.67-120 818.67-120H141.33Zm0-66.67h677.34v-586.66H141.33v586.66Zm0 0v-586.66 586.66Z"/></svg> Detailed Analysis
                        </h3>

                        <div className="mt-6 space-y-5">
                      
                        <div>
                            <div className="flex justify-between mb-1">
                            <span className="text-white">Communication</span>
                            <span className="text-white font-medium">{feedBackdata.skills.communication}%</span>
                            </div>
                            <div className="w-full bg-blue-100 rounded-full h-2.5">
                            <div className={`bg-blue-600 h-2.5 rounded-full w-[${feedBackdata.skills.communication}%]`}></div>
                            </div>
                        </div>

                     
                        <div>
                            <div className="flex justify-between mb-1">
                            <span className="text-white">Strategy</span>
                            <span className="text-white font-medium">{feedBackdata.skills.strategy}%</span>
                            </div>
                            <div className="w-full bg-blue-100 rounded-full h-2.5">
                            <div className={`bg-blue-600 h-2.5 rounded-full w-[${feedBackdata.skills.strategy}%]`}></div>
                            </div>
                        </div>

                    
                        <div>
                            <div className="flex justify-between mb-1">
                            <span className="text-white">Teamwork</span>
                            <span className="text-white font-medium">{feedBackdata.skills.teamwork}%</span>
                            </div>
                            <div className="w-full bg-blue-100 rounded-full h-2.5">
                            <div className={`bg-blue-600 h-2.5 rounded-full w-[${feedBackdata.skills.teamwork}%]`}></div>
                            </div>
                        </div>

                       
                        <div>
                            <div className="flex justify-between mb-1">
                            <span className="text-white">Adaptability</span>
                            <span className="text-white font-medium">{feedBackdata.skills.adaptability}%</span>
                            </div>
                            <div className="w-full bg-blue-100 rounded-full h-2.5">
                            <div className={`bg-blue-600 h-2.5 rounded-full w-[${feedBackdata.skills.adaptability}%]`}></div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="w-full  bg-gray-500  rounded-xl shadow-md p-6 md:p-8 mt-8 border border-gray-200">
                    <h3 className="text-[20px] font-semibold text-white flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#F3F3F3"><path d="M305.67-160q-9 0-16.84-4.5Q281-169 276.67-177l-82-146.33h66.66l41.34 80h90.66v-33.34h-70.66l-41.34-80H176.67l-61-106.66q-2-4.34-3.17-8.34t-1.17-8.33q0-2.67 4.34-16.67l61-106.66h104.66l41.34-80h70.66v-33.34h-90.66l-41.34 80h-66.66l82-146.33q4.33-8 12.16-12.5 7.84-4.5 16.84-4.5h111q14.33 0 23.83 9.5 9.5 9.5 9.5 23.83v170h-76.67L340-563.33h110v126.66h-94.67l-39.33-80h-96l-33.33 33.34h108l40 80H450v210q0 14.33-9.5 23.83-9.5 9.5-23.83 9.5h-111Zm261 0q-30.34 0-51.84-21.5-21.5-21.5-21.5-51.83 0-21.67 11-38.84 11-17.16 29-26.16v-363.34q-18-9-29-26.16-11-17.17-11-38.84 0-30.33 21.5-51.83t51.84-21.5q30.33 0 51.83 21.5t21.5 51.83q0 21.67-11 38.84-11 17.16-29 26.16V-552l93.33-56q-2-32 19.84-55.33 21.83-23.34 53.5-23.34 30.33 0 51.83 21.5t21.5 51.84q0 30.33-21.5 51.83T766.67-540q-11 0-20.84-2.83-9.83-2.84-18.16-7.84L625.33-489l111 88.67q7-3 14.67-4.67t15.67-1.67q30.33 0 51.83 21.5t21.5 51.84q0 30.33-21.5 51.83T766.67-260q-35.67 0-57.17-27.33Q688-314.67 695-348l-95-76.33v127q17.33 9 28.17 25.83Q639-254.67 639-233.33q0 30.33-21 51.83T566.67-160Z"/></svg>
                    AI-Generated Insights
                    </h3>

                    <div className="mt-6 space-y-5">
                   
                    {
                        feedBackdata.answers_feedback.map((item,index)=>{
                            return(
                                <div key={index} className={`mb-8 `}>
                      
                    
                      <p className="text-xl font-bold text-gray-900 mb-1">
                        <span className="font-bold text-lg mr-2 text-white">Q:</span> 
                        {item.question}
                      </p>

                    
                      <p className="w-full italic flex flex-col text-white ml-4 mb-4 text-[17px]">
                        <span className="font-semibold text-[20px] flex gap-2 text-white mr-1  text-left">
                            Your Answer
                            <ArrowRightToLine/>
                        </span> 
                        {item.answer}
                      </p>

                     
                      <div className="bg-gray-50 p-3 rounded-md border border-gray-200 shadow-inner ml-4">
                        <p className="font-semibold text-sm text-gray-700 mb-1">Feedback:</p>
                        <p className="text-gray-600 text-sm">
                          {item.feedback}
                          </p>
                      </div>
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