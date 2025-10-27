"use client";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { MenuIcon } from "lucide-react"; 


export default function GoogleAuthButton() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  
if (status === "loading")
  return (
    <>
      {/* Desktop Skeleton */}
      <div className="hidden md:flex items-center rounded p-1 text-sm gap-3 animate-pulse">
        <div className="flex items-center border border-gray-600 rounded p-1 text-sm gap-3">
          {/* Skeleton for user image */}
          <div className="w-9 h-9 rounded-full bg-gray-700"></div>

          {/* Skeleton for user name */}
          <div className="h-4 w-24 bg-gray-700 rounded"></div>
        </div>

        {/* Skeleton for sign out button */}
        <div>
          <div className="h-7 w-16 bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Mobile Skeleton */}
      <div className="flex md:hidden items-center gap-2 animate-pulse">
        <div className="h-10 w-9 bg-gray-700 rounded"></div>
      </div>
    </>
  );


  if (session) {
    return (
      <div className="relative">
        {/* Desktop View */}
        <div className="hidden md:flex items-center rounded p-1 text-sm gap-3">
          <Link href="/dashboard" className="p-1 border-b rounded hover:text-blue-500">
            Dashboard
          </Link>
          <Link href="/interview" className="p-1 border-b rounded hover:text-blue-500">
            Get Started
          </Link>

          <div className="flex items-center border border-gray-600 rounded p-1 text-sm gap-3">
            <img
              src="/user.png"
              alt={session.user.name}
              style={{ width: 36, height: 36, borderRadius: "50%" }}
            />
            <span className="text-white">{session.user.name}</span>
          </div>

          <button
            className="bg-red-500 rounded p-1 text-gray-950"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>

        {/* Mobile View */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-white border rounded p-1"
          >
            {/* You can replace "=" with <Menu size={24}/> if using lucide-react */}
            <MenuIcon/>
          </button>
        </div>

        {/* Dropdown Menu for Mobile */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-50 bg-gray-900 border border-gray-700 rounded-lg shadow-lg flex flex-col gap-2 p-2 z-50">
            <Link
              href="/dashboard"
              className="p-1 hover:bg-gray-700 border-b  hover:text-blue-500 rounded text-[15px]  border-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              User Dashboard
            </Link>
            <Link
              href="/interview"
              className="p-1 hover:bg-gray-700 border-b  hover:text-blue-500 rounded text-[15px]  border-gray-400"
              
            >
              Get Started
            </Link>

            <div className="flex items-center border border-gray-600 rounded p-1 text-sm gap-3">
              <img
                src="/user.png"
                alt={session.user.name}
                style={{ width: 25, height: 25, borderRadius: "50%" }}
              />
              <span className="text-white text-[10px]">{session.user.name}</span>
            </div>
            <button
              className="w-full flex items-center justify-center text-[15px] cursor-pointer bg-red-600 hover:bg-red-700 rounded "
              onClick={() => {
                setMenuOpen(false);
                signOut();
              }}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <button
        className="flex items-center p-2 text-sm gap-2 rounded border border-gray-600"
        onClick={() => signIn("google")}
      >
        <img src="/google.png" alt="Google Icon" style={{ width: 20, height: 20 }} />
        Sign in with Google
      </button>
    </div>
  );
}
