'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import './../../globals.css';
import Footer from '@/components/footer';

function Page() {
  const router = useRouter();
  const searchparams = useSearchParams();

  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

  const constUsername = searchparams.get("fullname");
  const jobrole = searchparams.get("jobrole");
  const experience = searchparams.get("experience");
  const questionlevel = searchparams.get("questionlevel");
  const questions = searchparams.get("questions");
  const locationpreference = searchparams.get("locationpreference");
  const userId = searchparams.get("userid");

  const [isActive, setIsActive] = useState(false);
  const [userData, setUserData] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(true); // 🔹 Added loading state
  const [allQuestions, setallQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [qaList, setQaList] = useState([]);
  const [listeningMode, setListeningMode] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: `Hello ${constUsername}! Your interview for the role of ${jobrole} has been scheduled... Good luck!`
    },
  ]);
  const [showModal, setShowModal] = useState(true);
  const [submitData, setSubmitData] = useState([]);
  const [onSubmitData, setOnSubmitData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [updateId, setUpdateId]=useState(null);
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const chatEndRef = useRef(null);

  const missing = !constUsername || !jobrole || !experience || !questionlevel || !questions || !locationpreference || !userId;

  // ✅ Fetch session data with loading
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = sessionStorage.getItem("interviewdata");
      const dataid=sessionStorage.getItem("dataid");

      if (dataid) setUserData(dataid);
      setUpdateId(dataid);

      if (data) setUserData(data);
      setIsLoadingData(false); // Stop loading after fetching
    }, 1000); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  useEffect(()=>{
    console.log(userData);
    console.log(updateId);
  },[]);

  useEffect(() => {
    if (allQuestions.length > 0 && currentQuestionIndex < allQuestions.length) {
      setMessages(prev => [...prev, { role: "ai", text: allQuestions[currentQuestionIndex]?.question }]);
    }
  }, [currentQuestionIndex, allQuestions]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-center p-10 text-red-500">
        Your browser does not support speech recognition.
      </div>
    );
  }

  // 🔹 Show loader until session data is ready
  if (isLoadingData) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-black text-white">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium">Loading interview setup...</p>
      </div>
    );
  }

  // ---------- Functions ----------
  const startListening = () => {
    setListeningMode(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setListeningMode(false);

    if (transcript.trim() && allQuestions[currentQuestionIndex]) {
      const qna = {
        question: allQuestions[currentQuestionIndex]?.question,
        answer: transcript,
      };

      setQaList(prev => [...prev, qna]);
      setMessages(prev => [...prev, { role: "user", text: transcript }]);
      setCurrentQuestionIndex(prev => prev + 1);

      resetTranscript();
    }
  };

  const initSpeechRecognition = () => {
    console.log("🎤 Initializing Speech Recognition...");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition. Please use Chrome or Edge.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.start();
    } catch (error) {
      console.error("❌ Error initializing recognition:", error);
    }
  };

  const submitStart = async () => {
    console.log("interview started",userData);
    

    const storedData = userData || sessionStorage.getItem("interviewMessage");
 

    console.log("dataid is", updateId);
    if (!storedData) {
      alert("Missing user data. Please re-upload your resume or refresh the page.");
      return;
    }

    setIsActive(true);
    try {
      const response = await axios.post(`${baseURL}/interviwer`, {
        userId,
        fullname: constUsername,
        jobrole,
        experience,
        questionlevel,
        questions,
        locationpreference,
        resumeText: storedData,
      });

      const questionsData = response.data?.questions?.questions || response.data?.questions || [];
      setallQuestions(questionsData);
      setIsModalOpen(false);
      setIsActive(false);
      initSpeechRecognition();
    } catch (error) {
      console.error("❌ Error fetching interview questions:", error);
      setIsActive(false);
      alert("Something went wrong while fetching questions. Please try again.");
    }
  };


  // useEffect(()=>{
  //   console.log(updateId);
  // },[sessionStorage]
  // );
  const aftersubmit = async () => {
    console.log("Final Q&A:", qaList);
    setOnSubmitData(false);

    try {
      const submitResponse = await axios.post(`${baseURL}/givefeedback`, { qaList });
      sessionStorage.setItem("feedback", JSON.stringify(submitResponse.data.data));

      const updatedata=await axios.put(`${baseURL}/upadatedata/${updateId}`,{
          isInterviewDone: true,
          feedbackData: {
            strengths:submitResponse.data.data.strengths, 
            growthOpportunities:submitResponse.data.data.growth_opportunities,
            skills: {
              communication:submitResponse.data.data.skills.communication,
              strategy: submitResponse.data.data.skills.strategy,
              teamwork:submitResponse.data.data.skills.teamwork,
              adaptability:submitResponse.data.data.skills.adaptability,
            },
            comments: "Candidate performed well in the interview, just needs more hands-on experience."
          },
          answers_feedback:submitResponse.data.data.answers_feedback
          
        }
        )

        console.log('update data resposnce',updatedata);
      router.push("/interview/userview/feedback");


    } catch (error) {
      console.log("submit error", error);
      setOnSubmitData(true);
    }
  };

  // ---------- Render ----------
  return (
    <div className="w-full bg-black relative">
      {missing ? (
        <div className="w-full h-screen content-center text-center space-y-4">
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
      ) : (
        <div className="min-h-screen relative bg-black ">
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-transparent z-50 flex justify-center items-center backdrop-blur-sm">
              <div className="bg-white p-6 rounded-lg shadow-2xl max-w-sm md:max-w-xl w-full absolute transform transition-all duration-300 scale-100 opacity-100">
                <h2 className="text-2xl font-bold mb-3 text-indigo-600">
                  Pre-condition
                </h2>

                <div className='space-y-4 mb-6'>
                  <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
                    <p className="font-bold">Note</p>
                    <p><span className='p-1'>1)</span>Ensure your microphone is enabled and functioning properly for the best experience.</p>
                    <p><span className='p-1'>2)</span>Do not refresh once your interview gets started until it ends.</p>
                  </div>
                </div>

                <p className="text-gray-700">
                  Click on Start button to begin the AI Interview. You will be asked {questions} questions based on your selected level.
                </p>

                <div className={`text-sm text-start flex items-center gap-2 mt-2 ${isActive ? "text-green-500" : "text-red-700"} font-medium`}>
                  {isActive ? (
                    <div className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
                      Loading
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    allQuestions.length > 0 ? (
                      <div className='bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2'>
                        <h1 className='text-white gap-2 flex items-center'>
                          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"/></svg>Started
                        </h1>
                      </div>
                    ) : (
                      <button onClick={submitStart} className='bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 transform transition duration-300 hover:scale-105 hover:bg-blue-500 animate-pulse'>Start</button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Rest of UI remains identical */}
          <div className="w-full flex flex-row gap-2 justify-between items-center bg-gray-900 p-2 shadow">
            <div className="p-6">
              <h1 className="text-xl md:text-2xl font-bold text-white">AI Interview</h1>
              <p className="text-gray-400">Give your answers to AI Interviewer</p>
            </div>

            <div className='flex'>
              <div className="w-full flex flex-col gap-1">
                <div className='w-full flex items-center gap-2'>
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-fullflex items-center justify-center font-bold text-white">
                    <img src='/user.png' alt='user' />
                  </div>
                  <h2 className="text-xl font-bold">{constUsername}</h2>
                </div>

                <div className='hidden md:block w-full pl-10'>
                  <div className="flex gap-2 mt-1 md:text-sm text-[10px] text-gray-300">
                    <span className="bg-gray-900 border border-gray-700 px-2 py-1 rounded">Job Role: {jobrole}</span>
                    <span className="bg-gray-900 border border-gray-700 px-2 py-1 rounded">{experience} Years of experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat + Input + Footer remain same */}
          <div className="bg-gray-800 flex items-center justify-center">
            <div className="w-full h-screen shadow-lg border border-gray-800 bg-gray-900 flex flex-col">
              <div className="w-full p-6 md:px-40 space-y-4 bg-gray-800 min-h-[400px] max-h-[400px] overflow-y-auto">
                {messages.map((msg, idx) => (
                  <div
                    ref={chatEndRef}
                    key={idx}
                    className={`flex items-start gap-2 w-full animate-fade-in ${msg.role === "ai" ? "justify-start" : "justify-end"}`}
                  >
                    {msg.role === "ai" ? (
                      <div className="flex items-start gap-2 max-w-[70%]">
                        <div className="w-8 h-8 bg-white rounded-full shrink-0">
                          <img src="/artificial-intelligence.png" className="w-8 h-8 rounded-full border" alt="ai" />
                        </div>
                        <p className="px-4 py-2 rounded-lg bg-gray-700 text-white break-words whitespace-pre-wrap">
                          {msg.text}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 max-w-[70%] flex-row-reverse">
                        <div className="w-8 h-8 shrink-0">
                          <img src="/user.png" className="w-8 h-8 rounded-full border" alt="user" />
                        </div>
                        <p className="px-4 py-2 rounded-lg bg-blue-600 text-white break-words whitespace-pre-wrap">
                          {msg.text}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {allQuestions.length > 0 && currentQuestionIndex < allQuestions.length ? (
                <div className="px-15 md:px-40 py-4 bg-gray-800">
                  <div className='rounded-3xl bg-gray-700 p-2 flex items-center gap-2'>
                    {listeningMode ? (
                      <div className="flex items-center space-x-1 rotate-180">
                        <span className="w-1 h-3 bg-blue-400 rounded animate-wave1"></span>
                        <span className="w-1 h-3 bg-purple-400 rounded animate-wave2"></span>
                        <span className="w-1 h-6 bg-pink-400 rounded animate-wave3"></span>
                        <span className="w-1 h-6 bg-blue-400 rounded animate-wave4"></span>
                        <span className="w-1 h-6 bg-purple-400 rounded animate-wave5"></span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 rotate-180">
                        <span className="w-1 h-3 bg-blue-400 rounded"></span>
                        <span className="w-1 h-4 bg-purple-400 rounded"></span>
                        <span className="w-1 h-2 bg-pink-400 rounded"></span>
                        <span className="w-1 h-3 bg-blue-400 rounded"></span>
                        <span className="w-1 h-6 bg-purple-400 rounded"></span>
                      </div>
                    )}

                    <div className="flex-1 bg-gray-700 text-white px-4 py-2 rounded">{transcript}</div>

                    {!listeningMode ? (
                      <button onClick={startListening} className="bg-blue-600 px-2 py-2 text-white rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D9D9D9"><path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z"/></svg>
                      </button>
                    ) : (
                      <button onClick={stopListening} className="bg-red-600 px-2 py-2 text-white rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D9D9D9"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
                      </button>
                    )}
                  </div>
                </div>
              ) : allQuestions.length > 0 && currentQuestionIndex >= allQuestions.length ? (
                <div className="w-full flex flex-col items-center gap-2 p-4 text-center">
                  <h2 className='text-xl md:text-2xl flex gap-2'>
                    <span className='text-4xl md:text-6xl text-pink-600'>“</span>
                    Thank you for completing the interview! 🎉
                    <span className='text-4xl md:text-6xl text-pink-600'>”</span>
                  </h2>
                  <h3>Click below to get score</h3>
                  {onSubmitData ? (
                    <button onClick={aftersubmit} className="bg-green-600 px-6 py-2 rounded text-white">Submit</button>
                  ) : (
                    <div className="bg-green-600 flex items-center gap-1 px-6 py-2 rounded text-white">
                      loading
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              ) : null}

              <Footer />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
