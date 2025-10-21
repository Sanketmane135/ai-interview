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

  // ✅ Always define hooks at the top
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

  const chatEndRef = useRef(null);
  const missing = !constUsername || !jobrole || !experience || !questionlevel || !questions || !locationpreference || !userId;

  // ✅ Hooks must all be defined before any conditional returns
  useEffect(() => {
    const data = localStorage.getItem("interviewMessage");
    if (data) setUserData(data);
  }, []);

  useEffect(() => {
    if (allQuestions.length > 0 && currentQuestionIndex < allQuestions.length) {
      setMessages(prev => [...prev, { role: "ai", text: allQuestions[currentQuestionIndex]?.question }]);
    }
  }, [currentQuestionIndex, allQuestions]);

  // ✅ Log for debugging (safe)
  useEffect(() => {
    console.log(allQuestions);
  }, [allQuestions]);

  useEffect(() => {
    console.log(submitData);
  }, [submitData]);

  // ✅ Safe return check (AFTER hooks)
  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-center p-10 text-red-500">
        Your browser does not support speech recognition.
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

  // const submitStart = async () => {
  //   console.log('interview submitted');
    
  //   if (userData) {
  //     setIsActive(true);
  //     try {
  //       const response = await axios.post(`https://interview-8dwu.vercel.app/interviwer`, {
  //         userId,
  //         fullname: constUsername,
  //         jobrole,
  //         experience,
  //         questionlevel,
  //         questions,
  //         locationpreference,
  //         resumeText: userData,
  //       });
  //       setallQuestions(response.data.questions.questions);
  //       setIsActive(false);
  //       setIsModalOpen(false);
  //     } catch (error) {
  //       console.error("Error:", error);
  //       setIsActive(false);
  //     }
  //   }
  // };


  const initSpeechRecognition = () => {
  console.log("🎤 Initializing Speech Recognition...");

  // ✅ Browser compatibility check
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Your browser does not support Speech Recognition. Please use Chrome or Edge.");
    console.error("SpeechRecognition not supported in this browser.");
    return;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => console.log("🎙️ Speech recognition started!");
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("🗣️ Speech result:", transcript);
    };
    recognition.onerror = (event) => {
      console.error("⚠️ Speech recognition error:", event.error);
      if (event.error === "not-allowed") {
        alert("Please allow microphone access to start the interview.");
      } else if (event.error === "no-speech") {
        alert("No speech detected. Try speaking again.");
      }
    };
    recognition.onend = () => console.log("Speech recognition ended.");

    // ✅ Attempt to start — must be triggered by user gesture
    recognition.start();
    console.log("Recognition started (called successfully)");

  } catch (error) {
    console.error("❌ Error initializing recognition:", error);
  }
};


  const submitStart = async () => {
  console.log("interview submitted");

  if (!userData) {
    alert("Missing user data. Please re-upload your resume or refresh the page.");
    return;
  }

  setIsActive(true);

  try {
    // ✅ Fetch questions from backend
    const response = await axios.post(`https://interview-8dwu.vercel.app/interviwer`, {
      userId,
      fullname: constUsername,
      jobrole,
      experience,
      questionlevel,
      questions,
      locationpreference,
      resumeText: userData,
    });

    console.log("✅ Backend response:", response.data);

    // ✅ Check the correct data path before setting
    const questionsData = response.data?.questions?.questions || response.data?.questions || [];
    setallQuestions(questionsData);

    if (!questionsData.length) {
      alert("No questions received from backend. Please check your API response format.");
      console.error("Questions data missing:", response.data);
    }

    setIsModalOpen(false);
    setIsActive(false);

    // ✅ Try initializing SpeechRecognition safely (optional immediate test)
    initSpeechRecognition();

  } catch (error) {
    console.error("❌ Error fetching interview questions:", error);
    setIsActive(false);
    alert("Something went wrong while fetching questions. Please try again.");
  }
};

  const aftersubmit = async () => {
    console.log("Final Q&A:", qaList);
    setOnSubmitData(false);

    try {
      const submitResponse = await axios.post(`https://interview-8dwu.vercel.app/givefeedback`, { qaList });
      localStorage.setItem("feedback", JSON.stringify(submitResponse.data.data));
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
                  
                  
                  {/* Modal Title and Body */}
                  <h2 className="text-2xl font-bold mb-3 text-indigo-600">
                      Pre-condition
                  </h2>
                  
                  <div className='space-y-4 mb-6'> 
                      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
                          <p className="font-bold">Note</p>
                          <p><span className='p-1'>1)</span>Ensure your microphone is enabled and functioning properly for the best experience.</p>
                          <p><span className='p-1'>2)</span>Do not refresh once your interview get started untill it gets end</p>

                      </div>
                  </div>

                  <p className="text-gray-700">
                      Click on Start button to begin the AI Interview. You will be asked {questions} questions based on your selected level.
                  </p>

                  {/* Optional: Additional Action Button */}
                  <div  className={`text-sm text-start flex items-center gap-2 mt-2 ${isActive?"text-green-500":"text-red-700"}   font-medium`}>
                    {isActive ? (
                      <div className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
                        Loading
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      allQuestions.length>0 ? (
                        <div className='bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2'>
                          <h1 className='text-white gap-2 flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"/></svg>Started
                          </h1>
                        </div>
                      ) : (
                        <button onClick={submitStart} className= 'bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 transform transition duration-300 hover:scale-105 hover:bg-blue-500 animate-pulse'>Start</button>
                      )
                    )}
                  </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="w-full flex  flex-row gap-2  justify-between items-center  bg-gray-900 p-2  shadow">
              
              <div className="p-6 ">
                <h1 className="text-xl md:text-2xl font-bold text-white">AI Interview</h1>
                <p className="text-gray-400">Give your answers to AI Interviewer</p>
              </div>

            <div className='flex'>
               <div className="w-full flex flex-col  gap-1">
                      
                  <div className='w-full flex items-center gap-2'>
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-fullflex items-center justify-center font-bold text-white">
                    <img src='/user.png' alt='user'/>
                    </div>
                    <h2 className="text-xl font-bold">{constUsername}</h2>

                  </div>    
                  
                  <div className=' hidden md:block w-full pl-10  '>
                    <div className="flex  gap-2 mt-1 md:text-sm text-[10px] text-gray-300">
                      <span className="bg-gray-900 border border-gray-700 px-2 py-1 rounded">Job Role: {jobrole}</span>
                      <span className="bg-gray-900 border border-gray-700  px-2 py-1 rounded">{experience} Years of experince</span>
                    </div>
                  </div>
            </div>

            
            </div>
           
            
          </div>

          {/* Main content */}
          <div className="  bg-gray-800 flex items-center justify-center">
            <div className="w-full h-screen shadow-lg border border-gray-800 bg-gray-900 flex flex-col">

              {/* Chat Area */}
             <div className="w-full p-6 md:px-40 space-y-4 bg-gray-800 min-h-[400px] max-h-[400px] overflow-y-auto">
              {messages.map((msg, idx) => (
                <div
                  ref={chatEndRef}
                  key={idx}
                  className={`flex items-start gap-2 w-full animate-fade-in ${
                    msg.role === "ai" ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* AI/User container */}
                  {msg.role === "ai" ? (
                    <div className="flex items-start gap-2 max-w-[70%]">
                      {/* Avatar */}
                      <div className="w-8 h-8 bg-white rounded-full shrink-0">
                        <img
                          src="/artificial-intelligence.png"
                          className="w-8 h-8 rounded-full border"
                          alt="ai"
                        />
                      </div>

                      {/* Bubble */}
                      <p className="px-4 py-2 rounded-lg bg-gray-700 text-white break-words whitespace-pre-wrap">
                        {msg.text}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 max-w-[70%] flex-row-reverse">
                      {/* Avatar */}
                      <div className="w-8 h-8 shrink-0">
                        <img
                          src="/user.png"
                          className="w-8 h-8 rounded-full border"
                          alt="user"
                        />
                      </div>

                      {/* Bubble */}
                      <p className="px-4 py-2 rounded-lg bg-blue-600 text-white break-words whitespace-pre-wrap">
                        {msg.text}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

              {/* Input Area */}
              {allQuestions.length > 0 && currentQuestionIndex < allQuestions.length ? (
                <div className=" px-15 md:px-40 py-4 bg-gray-800">
                <div className=' rounded-3xl bg-gray-700 p-2 flex items-center gap-2'>
                  {
                    listeningMode?(<div className="flex items-center  space-x-1  rotate-180">
                      <span className="w-1 h-3 bg-blue-400 rounded animate-wave1"></span>
                      <span className="w-1 h-3 bg-purple-400 rounded animate-wave2"></span>
                      <span className="w-1 h-6 bg-pink-400 rounded animate-wave3"></span>
                      <span className="w-1 h-6 bg-blue-400 rounded animate-wave4"></span>
                      <span className="w-1 h-6 bg-purple-400 rounded animate-wave5"></span>
                    </div>):(<div className="flex items-center  space-x-1  rotate-180">
                      <span className="w-1 h-3   bg-blue-400 rounded "></span>
                      <span className="w-1 h-4 bg-purple-400 rounded "></span>
                      <span className="w-1 h-2 bg-pink-400 rounded "></span>
                      <span className="w-1 h-3 bg-blue-400 rounded "></span>
                      <span className="w-1 h-6 bg-purple-400 rounded "></span>
                    </div>)
                  }
                     

                  <div className="flex-1 bg-gray-700 text-white px-4 py-2 rounded " >{transcript}</div>
                  
                  {!listeningMode ? (
                    <button onClick={startListening} className="bg-blue-600 px-2 py-2 text-white rounded-full"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-420q-41.92 0-70.96-29.04Q380-478.08 380-520v-240q0-41.92 29.04-70.96Q438.08-860 480-860q41.92 0 70.96 29.04Q580-801.92 580-760v240q0 41.92-29.04 70.96Q521.92-420 480-420Zm0-220Zm-30 510v-131.85q-99-11.31-164.5-84.92Q220-420.39 220-520h60q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h60q0 99.61-65.5 173.23Q609-273.16 510-261.85V-130h-60Zm30-350q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z"/></svg></button>
                  ) : (
                    <button onClick={stopListening} className="bg-red-600 px-2 py-2 text-white rounded-full"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M340-340h280v-280H340v280Zm140.13 220q-74.67 0-140.41-28.34-65.73-28.34-114.36-76.92-48.63-48.58-76.99-114.26Q120-405.19 120-479.87q0-74.67 28.34-140.41 28.34-65.73 76.92-114.36 48.58-48.63 114.26-76.99Q405.19-840 479.87-840q74.67 0 140.41 28.34 65.73 28.34 114.36 76.92 48.63 48.58 76.99 114.26Q840-554.81 840-480.13q0 74.67-28.34 140.41-28.34 65.73-76.92 114.36-48.58 48.63-114.26 76.99Q554.81-120 480.13-120Zm-.13-40q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></button>
                  )}
                </div>
                </div>
              ) : allQuestions.length > 0 && currentQuestionIndex >= allQuestions.length ? (
                 <div className=" w-full flex flex-col items-center gap-2 p-4 text-center">
                  <h2 className='text-xl md:text-2xl flex gap-2'><span className='text-4xl md:text-6xl text-pink-600'>“</span>Thank you for completing the interview! 🎉 <span className='text-4xl md:text-6xl text-pink-600'>”</span></h2>
                  <h3>Click bellow to get score</h3>
                  {
                    onSubmitData?(<button onClick={aftersubmit} className=" bg-green-600 px-6 py-2 rounded text-white">
                    Submit
                  </button>):(<div className=" bg-green-600 flex items-center gap-1 px-6 py-2 rounded text-white">
                    loading
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>)
                  }
                  
                </div>

              ) : null}
             
              
                <Footer/>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default Page;
