import React from 'react';

const Hero = () => {
  return (
    // 1. Background ko Dark (slate-900) se hata kar Light Gradient kar diya
    <div className="bg-gradient-to-b from-blue-50 via-white to-white pt-24 pb-20 border-b border-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* 2. Heading Text Color -> Dark Slate (Taaki white par dikhe) */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-slate-900 leading-tight">
          Find Your <span className="text-blue-600">Dream Job</span> Today
        </h1>
        
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
          Connecting talent with opportunity. Thousands of jobs in engineering, 
          design, and technology are waiting for you.
        </p>

        {/* 3. Search Bar Container -> White Box with Shadow */}
        <div className="bg-white p-4 rounded-2xl shadow-2xl shadow-blue-100/50 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center border border-gray-200">
          
          {/* Input 1 */}
          <div className="flex-1 w-full relative">
            <input 
              type="text" 
              placeholder="Job title, keywords, or company" 
              className="w-full p-4 pl-4 text-gray-900 bg-transparent border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition placeholder-gray-400"
            />
          </div>

          {/* Input 2 */}
          <div className="flex-1 w-full">
            <input 
              type="text" 
              placeholder="City, state, or zip code" 
              className="w-full p-4 pl-4 text-gray-900 bg-transparent border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition placeholder-gray-400"
            />
          </div>

          {/* Button */}
          <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl transition duration-200 shadow-lg shadow-blue-200">
            Search
          </button>
        </div>

        {/* 4. Popular Tags -> Gray Text */}
        <div className="mt-8 text-sm text-gray-500 font-medium">
          Popular: 
          <span className="text-blue-600 cursor-pointer hover:underline ml-2 bg-blue-50 px-2 py-1 rounded">Remote</span> 
          <span className="text-blue-600 cursor-pointer hover:underline ml-2 bg-blue-50 px-2 py-1 rounded">Java</span> 
          <span className="text-blue-600 cursor-pointer hover:underline ml-2 bg-blue-50 px-2 py-1 rounded">Product Design</span>
        </div>

      </div>
    </div>
  );
};

export default Hero;