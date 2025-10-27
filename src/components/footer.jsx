import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 justify-bet md:grid-cols-4 gap-8">
        {/* Logo + Description */}
        <div>
          <div className="flex items-center space-x-2">
            <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
              RQ
            </div>
            <h2 className="text-lg font-semibold">ResumeIQ</h2>
          </div>
          <p className="mt-4 text-gray-400 text-sm">
            AI-powered interview preparation that helps you land your dream job.
          </p>
        </div>
        
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
        © 2024 . ResumeIQ All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
