import React from 'react';

const Hero = () => {
  return (
    <div className="bg-slate-900 text-white pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Find Your <span className="text-blue-500">Dream Job</span> Today
        </h1>
        <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
          Thousands of jobs in the computer, engineering and technology sectors are waiting for you.
        </p>

        {/* Search Bar Container */}
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
          
          {/* Input 1: Job Title */}
          <div className="flex-1 w-full">
            <input 
              type="text" 
              placeholder="Job title, keywords, or company" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
            />
          </div>

          {/* Input 2: Location */}
          <div className="flex-1 w-full">
            <input 
              type="text" 
              placeholder="City, state, or zip code" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
            />
          </div>

          {/* Search Button */}
          <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition duration-200">
            Search Jobs
          </button>
        </div>

        {/* Popular Searches (Optional) */}
        <div className="mt-8 text-sm text-gray-400">
          Popular: <span className="text-white hover:underline cursor-pointer">Java Developer</span>, <span className="text-white hover:underline cursor-pointer">React JS</span>, <span className="text-white hover:underline cursor-pointer">Data Science</span>
        </div>

      </div>
    </div>
  );
};

export default Hero;