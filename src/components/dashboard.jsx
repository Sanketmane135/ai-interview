"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { AlertCircle, CheckCircle2, Eye, File, TrendingUp, TriangleAlert, X } from "lucide-react";
import Image from "next/image";

function Dashboard() {
  const [dataLoading, setDataLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const { data: session, status } = useSession();
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const usermail = session?.user.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${baseURL}/getuserdata`, {
          email: usermail,
        });
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setDataLoading(false);
      }
    };

    if (status === "authenticated" && usermail) {
      fetchData();
    }
  }, [status, session]);

  const openModal = (interview) => {
    setSelectedInterview(interview);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedInterview(null);
    setIsModalOpen(false);
  };

 
  if (dataLoading)
    return (
      <div className="w-full h-screen flex gap-2 items-center justify-center text-2xl">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        Loading data...
      </div>
    );

  return (
    <div className="px-5 md:px-20 py-10 min-h-screen text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Interview Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            All records about the completed interviews
          </p>
        </div>
      </div>

      <h2 className="flex items-center text-xl md:text-2xl font-semibold mb-5 gap-2">
        <TrendingUp /> All Interviews
      </h2>

      {userData?.success === false ? (
        <div className="w-full flex items-center justify-center text-xl text-white">
          <TriangleAlert size={50} />
          {userData.message}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {userData?.data?.filter((v) => v.isInterviewDone === true)?.map((v, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-5 flex flex-col justify-between text-gray-800"
            >
              <div className="w-full flex items-center gap-2">
                <Image src={"/user.png"} width={40} height={20} alt="user" />
                <h3 className="text-lg font-semibold mb-2">
                  {v.userData.candidatename}
                </h3>
              </div>

              <p>
                <span className="font-medium">Role:</span> {v.userData.jobRole}
              </p>
              <p>
                <span className="font-medium">Experience:</span>{" "}
                {v.userData.experience}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {v.updatedAt.split("T")[0]}
              </p>
              <p className="text-blue-600 font-semibold mt-1 flex items-center gap-2">
                <File size={20} /> {v.userData.resumefile}
              </p>

              <button
                onClick={() => openModal(v)}
                className="mt-4 w-full py-2 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-800 cursor-pointer flex items-center justify-center gap-2"
              >
                <Eye /> View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🪟 Modal Section */}
      {isModalOpen && selectedInterview && (
        <div className="  fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white max-h-[80vh] overflow-y-auto rounded-xl shadow-lg w-11/12 md:w-1/2 p-6 text-gray-800 relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4">Interview Details</h2>

            <div className="space-y-2">
              <p>
                <strong>Candidate Name:</strong>{" "}
                {selectedInterview.userData.candidatename}
              </p>
              <p>
                <strong>Job Role:</strong> {selectedInterview.userData.jobRole}
              </p>
              <p>
                <strong>Experience:</strong>{" "}
                {selectedInterview.userData.experience}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {selectedInterview.updatedAt.split("T")[0]}
              </p>
              <p>
                <strong>Resume:</strong> {selectedInterview.userData.resumefile}
              </p>
            </div>

      

              {/* skills */}
              <div className="bg-white rounded-xl shadow-md p-6 mt-5">
                {/* Main Grid */}
                <div className="grid  gap-6">

                  {/* Left: Skills & Comments */}
                  <div className="md:col-span-2 space-y-6">
                    <div className="border border-gray-200 rounded-lg p-5">
                      <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Skills Assessment
                      </h2>

                      {/* Adaptability */}
                      <div className="mb-3">
                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                          <span>Adaptability</span>
                          <span className="text-blue-700 font-semibold">{selectedInterview.feedbackData.skills.adaptability}/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: "80%" }}
                          ></div>
                        </div>
                      </div>

                      {/* Communication */}
                      <div className="mb-3">
                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                          <span>Communication</span>
                          <span className="text-blue-700 font-semibold">{selectedInterview.feedbackData.skills.communication}/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: "70%" }}
                          ></div>
                        </div>
                      </div>

                      {/* strategy */}
                      <div className="mb-3">
                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                          <span>strategy</span>
                          <span className="text-blue-700 font-semibold">{selectedInterview.feedbackData.skills.strategy}/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: "80%" }}
                          ></div>
                        </div>
                      </div>

                      {/* teamwork */}
                       <div className="mb-3">
                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                          <span>teamwork</span>
                          <span className="text-blue-700 font-semibold">{selectedInterview.feedbackData.skills.teamwork}/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: "80%" }}
                          ></div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Right: Strengths & Growth */}
                  <div className="space-y-6">
                    {/* Strengths */}
                    <div className="border border-gray-200 rounded-lg p-5">
                      <h2 className="text-lg font-semibold text-gray-800 mb-3">
                        Strengths
                      </h2>
                      <ul className="space-y-2 text-green-600">
                        {
                        selectedInterview.feedbackData.strengths.map((v,index)=>{
                          return(
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle2 size={18} />
                                {v}
                              </li>
                          )
                        })}
                        
                      </ul>
                    </div>

                    {/* Growth Opportunities */}
                    <div className="border border-gray-200 rounded-lg p-5">
                      <h2 className="text-lg font-semibold text-gray-800 mb-3">
                        Growth Opportunities
                      </h2>
                      <ul className="space-y-2 text-amber-600">

                         {
                        selectedInterview.feedbackData.growthOpportunities.map((v,index)=>{
                          return(
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm leading-relaxed"
                            >
                              <span className="flex-shrink-0 text-orange-600 mt-1">
                                <AlertCircle size={18} strokeWidth={2} />
                              </span>
                              <span className="text-gray-800">
                                {v}
                              </span>
                            </li>

                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>


              {/* questiosn and answers */}
              <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-xl rounded-lg border border-gray-100">
      
                  {/* Title */}
                  <h1 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
                    Interview Q&A
                  </h1>

                  {/* Map through the QA data to render each section */}
                  {selectedInterview.answers_feedback.map((item, index) => (
                    <div key={index} className={`mb-8 `}>
                      
                      {/* Question (Q:) */}
                      <p className="text-xl font-medium text-gray-900 mb-1">
                        <span className="font-bold text-lg mr-2 text-indigo-600">Q:</span> 
                        {item.question}
                      </p>

                      {/* Answer (A:) */}
                      <p className="italic text-gray-600 ml-4 mb-4 text-sm">
                        <span className="font-semibold text-gray-500 mr-1">A:</span> 
                        {item.answer}
                      </p>

                      {/* Feedback Box */}
                      <div className="bg-gray-50 p-3 rounded-md border border-gray-200 shadow-inner ml-4">
                        <p className="font-semibold text-sm text-gray-700 mb-1">Feedback:</p>
                        <p className="text-gray-600 text-sm">
                          {item.feedback}
                          </p>
                      </div>
                    </div>
                  ))}
                  
                </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

