import React from "react";
import { Upload, MessageCircle, BarChart } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      icon: <Upload className="w-8 h-8 text-white" />,
      title: "Upload Resume",
      desc: "Simply drag and drop your PDF resume or browse to select it from your device.",
    },
    {
      id: "02",
      icon: <MessageCircle className="w-8 h-8 text-white" />,
      title: "Practice AI Interview",
      desc: "Engage with our AI interviewer in a realistic conversation tailored to your background.",
    },
    {
      id: "03",
      icon: <BarChart className="w-8 h-8 text-white" />,
      title: "Get Personalized Feedback",
      desc: "Receive detailed insights, confidence scores, and actionable improvement recommendations.",
    },
  ];

  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
        <p className="text-gray-400 mt-2">
          Get interview-ready in just three simple steps
        </p>

        {/* Steps */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-black border border-gray-800 rounded-2xl p-8 text-center shadow-md"
            >
              {/* Icon */}
              <div className="w-14 h-14 mx-auto flex items-center justify-center bg-blue-500 rounded-full">
                {step.icon}
              </div>

              {/* Step Number */}
              <p className="mt-4 text-blue-400 font-semibold">{step.id}</p>

              {/* Title */}
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>

              {/* Description */}
              <p className="mt-3 text-gray-400 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
