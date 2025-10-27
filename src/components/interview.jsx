'use client';
import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {useSession } from "next-auth/react";
function Interview() {


      
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [status, setStatus] = useState(null);
  const[useremail,setUserMail] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
  const { data: session} = useSession();
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // if(session){
  //   setUserMail(session.user.email)
  // }

  const handleFile = async (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setStatus("error");
      return;
    }
    setUploadedFile(file);
    setStatus("uploading");

    try {
      const formData = new FormData();

      formData.append("file", file);

      const res = await fetch(`${baseURL}/parse-pdf`, { 
        method: "POST", body: formData
       });

      if (!res.ok) { 
        setStatus("error");
         return; 
        }
      const data = await res.json();
      sessionStorage.setItem("interviewdata", data.text);
      setStatus("success");
       if(session){
        setUserMail(session.user.email)
      }

    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); };
  const handleBrowse = (e) => handleFile(e.target.files[0]);
  const removeFile = () => { setUploadedFile(null); setStatus(null); localStorage.removeItem("interviewdata"); };
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024, sizes = ["Bytes","KB","MB","GB"], i = Math.floor(Math.log(bytes)/Math.log(k));
    return (bytes / Math.pow(k,i)).toFixed(2) + " " + sizes[i];
  };

  const [userName,setUserName] = useState("");
  const [usermail,setUsermail] = useState("");
  const [userPhone,setPhone] = useState("");
  const [jobrole,setJobrole] = useState("");
  const [experince,setExperince] = useState("");
  const [qlevel,setqlevel] = useState("");
  const [questions,setQuestions] = useState("");
  const [location,setLocation] = useState("");

  const aftersubmit=async(e)=>{
    e.preventDefault();
    if(!userName || !usermail || !userPhone || !jobrole || !experince || !qlevel || !questions || !location){
      toast.error("All Fields are required"); return;
    }
    if(!uploadedFile){ 
      toast.error("Please upload your resume"); 
      return;
     }

     try {
      const addData = await axios.post(`${baseURL}/adduserdata`,
        {
      isInterviewDone: false,
      userMail:useremail,
      candidatename: userName,
      email: usermail,
      jobRole:jobrole,
      experience: experince,
      locationPreference:location,
      resumefile:uploadedFile.name,
      feedbackData: {
        strengths: [],
        growthOpportunities: [],
        skills: {
          
        },
        comments: "NA"
      },
      answers_feedback: [
      ]
    });
    console.log('data responce', addData)

    sessionStorage.setItem("dataid", addData.data.data._id);

     } catch (error) {
      console.log('error in adding data', error)
     }

    router.push(`/interview/userview?fullname=${userName}&jobrole=${jobrole}&experience=${experince}&questionlevel=${qlevel}&questions=${questions}&locationpreference=${location}&userid=${usermail}`);
  }
  return (
     <div className="bg-gray-900 min-h-screen py-10 px-4 sm:px-6 lg:px-20 xl:px-40">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-2xl md:text-4xl font-bold text-gray-100 mb-8">
          Upload Your Resume & Fill Out the FORM to start <span className="text-blue-500">AI Interview</span> experience
        </h1>

        <div className="flex flex-col md:flex-row gap-6">

          {/* Resume Upload */}
          <div className="flex-1">
            {!uploadedFile ? (
              <div
                onDragOver={(e)=>{e.preventDefault(); setIsDragging(true);}}
                onDragLeave={()=>setIsDragging(false)}
                onDrop={handleDrop}
                className={` md:h-110 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragging ? "border-blue-500 bg-gray-700" : "border-gray-600 bg-gray-800"}`}
              >
                <div className="mx-auto w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </div>
                <p className="mt-4 text-lg text-gray-300">{isDragging ? "Drop your resume here" : "Drag & drop your resume here"}</p>
                <p className="text-gray-400 mt-1">or click the button below</p>

                <label className="mt-4 inline-block">
                  <span className="px-5 py-2 bg-blue-500 text-white rounded-lg text-sm cursor-pointer hover:bg-blue-600">Browse Files</span>
                  <input type="file" accept="application/pdf" className="hidden" onChange={handleBrowse} />
                </label>

                <p className="text-sm text-gray-500 mt-2">Supports PDF files up to 10MB</p>
              </div>
            ) : (
              <div className="md:h-110 flex flex-col items-center justify-center border rounded-xl p-6 bg-gray-800  gap-4">
                <div className="flex justify-between items-center gap-5">
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <div className="flex items-center gap-3 border border-gray-600 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#007bff"><path d="M140-160q-24.75 0-42.37-17.63Q80-195.25 80-220v-440q0-24.75 17.63-42.38Q115.25-720 140-720h254l80-80h346q24.75 0 42.38 17.62Q880-764.75 880-740v520q0 24.75-17.62 42.37Q844.75-160 820-160H140Zm59-280h241v-241L199-440Zm-59-26 194-194H140v194Zm0 86v160h680v-520H500v300q0 24.75-17.62 42.37Q464.75-380 440-380H140Zm310-130Z"/></svg>
                      <div className="flex flex-col">
                        <p className="font-medium text-gray-200">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-400">{formatFileSize(uploadedFile.size)}</p>
                      </div>
                    </div>
                  </div>

                  <button onClick={removeFile} className="text-red-600 hover:text-red-500 font-semibold border rounded">Remove</button>
                </div>
                {status === "uploading" && <p className="text-blue-400">Processing resume...</p>}
                {status === "success" && <p className="text-green-400 font-medium">✅ Resume processed successfully!</p>}
                {status === "error" && <p className="text-red-500 font-medium">❌ Failed to process resume. Please upload a PDF.</p>}
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={aftersubmit} className="flex-1 border border-gray-700 rounded-xl p-6 bg-gray-800 space-y-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/** Full Name **/}
              <div>
                <label className="block text-sm font-medium text-gray-300">Full Name <span className="text-red-500">*</span></label>
                <input value={userName} onChange={e=>setUserName(e.target.value)} placeholder="Enter your full name" className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"/>
              </div>

              {/** Email **/}
              <div>
                <label className="block text-sm font-medium text-gray-300">Email <span className="text-red-500">*</span></label>
                <input value={usermail} onChange={e=>setUsermail(e.target.value)} placeholder="your.email@example.com" className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"/>
              </div>

              {/** Phone **/}
              <div>
                <label className="block text-sm font-medium text-gray-300">Phone <span className="text-red-500">*</span></label>
                <input type="tel" value={userPhone} onChange={e=>setPhone(e.target.value)} placeholder="+91 935970XXXX" className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"/>
              </div>

              {/** Job Role **/}
              <div>
                <label className="block text-sm font-medium text-gray-300">Preferred Job Role <span className="text-red-500">*</span></label>
                <select value={jobrole} onChange={e=>setJobrole(e.target.value)} className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">-- select job type --</option>
                  <option value="fulltime">Full-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              {/** Experience **/}
              <div>
                <label className="block text-sm font-medium text-gray-300">Experience Level <span className="text-red-500">*</span></label>
                <select value={experince} onChange={e=>setExperince(e.target.value)} className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">-- select experience --</option>
                  <option value="Fresher">Fresher</option>
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3+">3+ Years</option>
                </select>
              </div>

              {/** Level of Questions **/}
              <div>
                <label className="block text-sm font-medium text-gray-300">Level of Questions <span className="text-red-500">*</span></label>
                <select value={qlevel} onChange={e=>setqlevel(e.target.value)} className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">-- select level --</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              {/** Avg Questions **/}
              <div>
                <label className="block text-sm font-medium text-gray-300">Avg Questions <span className="text-red-500">*</span></label>
                <select value={questions} onChange={e=>setQuestions(e.target.value)} className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">-- Number of Questions --</option>
                  {[5,10,15,20,25,30,40,50,'50+'].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              {/** Location Preference **/}
              <div>
                <label className="block text-sm font-medium text-gray-300">Location Preference <span className="text-red-500">*</span></label>
                <input type="text" value={location} onChange={e=>setLocation(e.target.value)} placeholder="e.g., India, USA, Canada..." className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"/>
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all">Start Interview</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Interview