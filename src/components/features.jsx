import { LayoutDashboard } from 'lucide-react';
import React from 'react';

const HeroAndFeatures = () => {
  return (
    <div className=" bg-black text-gray-900 dark:text-gray-50">
     
      <div className="container mx-auto  text-center md:py-24">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Everything you need to succeed
        </h1>
        <p className="mt-4 text-lg font- text-gray-600 dark:text-gray-300 md:text-xl">
       Our AI-powered platform provides comprehensive interview preparation tailored to your unique profile.
        </p>
        
      </div>


    
      <div className="container mx-auto px-6 py-12 md:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
         
          <div className="rounded-lg bg-gray-950 p-6 shadow-lg border border-gray-900 ">
            <div className="flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#007bff"><path d="M317-160q-8 0-15-4t-11-11l-84-150h71l42 80h90v-30h-72l-42-80H191l-63-110q-2-4-3-7.5t-1-7.5q0-2 4-15l63-110h105l42-80h72v-30h-90l-42 80h-71l84-150q4-7 11-11t15-4h118q13 0 21.5 8.5T465-770v175h-85l-30 30h115v130h-98l-39-80h-98l-30 30h108l40 80h117v215q0 13-8.5 21.5T435-160H317Zm208 0q-13 0-21.5-8.5T495-190v-215h117l40-80h108l-30-30h-98l-39 80h-98v-130h115l-30-30h-85v-175q0-13 8.5-21.5T525-800h118q8 0 15 4t11 11l84 150h-71l-42-80h-90v30h72l42 80h105l63 110q2 4 3 7.5t1 7.5q0 2-4 15l-63 110H664l-42 80h-72v30h90l42-80h71l-84 150q-4 7-11 11t-15 4H525Z"/></svg>
            </div>
            <h3 className="mt-4 text-center text-xl font-bold">Smart Resume Analysis</h3>
            <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
              AI extracts your skills, experience, and qualifications to create personalized interview questions.
            </p>
          </div>

          
          <div className="rounded-lg bg-gray-950 p-6 shadow-lg border border-gray-900">
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#007bff"><path d="M80-80v-740q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H240L80-80Zm134-220h606v-520H140v600l74-80Zm-74 0v-520 520Z"/></svg>
            </div>
            <h3 className="mt-4 text-center text-xl font-bold">Tailored Interview Questions</h3>
            <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
             Practice with questions specifically designed for your background and target role. Our components are built to look great on any device, from desktop to mobile.
            </p>
          </div>

         
          <div className="rounded-lg bg-gray-950 p-6 shadow-lg border border-gray-900">
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#007bff"><path d="M320-460h320v-60H320v60Zm0 120h320v-60H320v60Zm0 120h200v-60H320v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"/></svg>
            </div>
            <h3 className="mt-4 text-center text-xl font-bold">Instant Feedback</h3>
            <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
              Get detailed analysis of your responses including strengths, weaknesses, and confidence scores.
            </p>
          </div>

          
          <div className="rounded-lg bg-gray-950 p-6 shadow-lg border border-gray-900">
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#007bff"><path d="M510-570v-270h330v270H510ZM120-450v-390h330v390H120Zm390 330v-390h330v390H510Zm-390 0v-270h330v270H120Zm60-390h210v-270H180v270Zm390 330h210v-270H570v270Zm0-450h210v-150H570v150ZM180-180h210v-150H180v150Zm210-330Zm180-120Zm0 180ZM390-330Z"/></svg>
            </div>
            <h3 className="mt-4 text-center text-xl font-bold">User Dashboard</h3>
            <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
             Manage your dashboardwith all previous feedback history
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroAndFeatures;