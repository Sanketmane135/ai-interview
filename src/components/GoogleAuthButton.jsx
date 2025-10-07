// components/GoogleAuthButton.jsx
"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function GoogleAuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <button className="flex items-center  border border-gray-600 rounded p-1 text-sm gap-3" disabled>Loading...</button>;

  if (session) {
    return (
      <div className="flex items-center rounded p-1 text-sm gap-3">
       <div className=" flex items-center  border border-gray-600 rounded p-1 text-sm gap-3">
            <img
          src="/user.png"
          alt={session.user.name}
          style={{ width: 36, height: 36, borderRadius: "50%" }}
        />
        <span className="text-white">   {session.user.name}</span>
       </div>
        
        <div>
          <button className="bg-red-500 rounded p-1 text-gray-950" onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button className="flex items-center p-2 text-sm gap-2 rounded border border-gray-600" onClick={() => signIn("google")}>
        <img
          src="/google.png"
          alt="Google Icon"
          style={{ width: 20, height: 20 }}
        />
         Sign in with Google</button>
    </div>
  );
}
