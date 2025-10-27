"use client"

import { useState } from "react";

export default function ResumeUpload() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [status, setStatus] = useState(null); 
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setStatus("error");
      return;
    }

    setUploadedFile(file);
    setStatus("uploading");

    
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleBrowse = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setStatus(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        
        
      </div>

      {!uploadedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
            isDragging ? "border-blue-500 bg-gray-400" : "border-gray-500"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
            </svg>
          </div>
          <p className="mt-4 text-lg text-gray-300 font-medium">
            {isDragging ? "Drop your resume here" : "Drag & drop your resume here"}
          </p>
          <p className="text-gray-400">or click to bellow button</p>

          <label  className="inline-block mt-4">
            <span htmlFor="inputfile" className="px-4 py-2 border text-gray-200 bg-blue-500 border-gray-400 rounded-lg text-sm cursor-pointer hover:bg-blue-800 hover:text-white">
              Browse Files
            </span>
            <input id="inputfile" type="file" accept="application/pdf" className="hidden" onChange={handleBrowse} />
          </label>

          <p className="text-sm text-gray-400 mt-2">Supports PDF files up to 10MB</p>
        </div>
      ) : (
        <div className="border rounded-lg p-6 space-y-4 bg-gray-900">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center  gap-2 border p-2 rounded border-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#007bff"><path d="M140-160q-24.75 0-42.37-17.63Q80-195.25 80-220v-440q0-24.75 17.63-42.38Q115.25-720 140-720h254l80-80h346q24.75 0 42.38 17.62Q880-764.75 880-740v520q0 24.75-17.62 42.37Q844.75-160 820-160H140Zm59-280h241v-241L199-440Zm-59-26 194-194H140v194Zm0 86v160h680v-520H500v300q0 24.75-17.62 42.37Q464.75-380 440-380H140Zm310-130Z"/></svg>
              <p className="font-medium">{uploadedFile.name}</p>
              
              <p className="text-sm text-gray-400">{formatFileSize(uploadedFile.size)}</p>
            </div>
            <button
              onClick={removeFile}
              className="text-white bg-red-700 p-1  rounded  "
            >
              Cancle
            </button>
          </div>

          {status === "uploading" && (
            <p className="text-blue-500">Processing resume...</p>
          )}
          {status === "success" && (
            <div className="text-green-500 border rounded p-2">
              ✅ Resume processed successfully! Ready for interview practice.
            </div>
          )}
          {status === "error" && (
            <div className="text-red-500">
              ❌ Failed to process resume. Please upload a PDF.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
