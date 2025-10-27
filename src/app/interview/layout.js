"use client";
import "./../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense} from "react";
import { SessionProvider } from "next-auth/react";


const metadata = {
  title: "Resume IQ - Your AI Interview partner",
  description: "Upload your resume and practice tailored interview questions powered by AI. Get instant feedback and boost your confidence.",
};

export default function InterviewLayout({ children }) {


  return (
    <html lang="en">
      <body>
        
        <section className="w-full bg-gray-600 ">
            <Suspense fallback={<div className="min-h-[400px]"></div>}><SessionProvider>{children}</SessionProvider></Suspense>
          <ToastContainer position="top-center" autoClose={3000} />
        </section>
        
      </body>
    </html>
  );
}
