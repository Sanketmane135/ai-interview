"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "./../globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, createContext, useState, useEffect } from "react";

// Create Context
export const InterviewContext = createContext();

const metadata = {
  title: "Resume IQ - Your AI Interview partner",
  description: "",

};

export default function InterviewLayout({ children }) {
  const [message, setMessage] = useState("");

  // Load from localStorage on first render
  useEffect(() => {
    const savedMsg = localStorage.getItem("interviewMessage");
    if (savedMsg) {
      setMessage(savedMsg);
    }
  }, []);

  // Save to localStorage whenever message changes
  useEffect(() => {
    if (message) {
      localStorage.setItem("interviewMessage", message);
    }
  }, [message]);

  return (
    <html lang="en">
      <body>
        
        <section className="w-full bg-gray-600 ">
            <Suspense fallback={<div className="min-h-[400px]"></div>}>{children}</Suspense>
          <ToastContainer position="top-center" autoClose={3000} />
        </section>
        
      </body>
    </html>
  );
}
