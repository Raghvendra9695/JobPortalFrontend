import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react'; 

const Home = () => {
  const navigate = useNavigate(); 


  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  
  const handleSearch = () => {
    navigate(`/jobs?title=${searchTitle}&location=${searchLocation}`);
  };

  
  const companies = [
    { name: "Capgemini", logo: "https://imgs.search.brave.com/cLK9fAvHL3UKKhW2v9EiwjiE20fkDlsgYK3qDKQomK0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/dHlwLnVzL2ZpbGUv/Y2FwZ2VtaW5pLnN2/Zw" },
    { name: "Wipro", logo: "https://imgs.search.brave.com/VlyHfK02jTFzlUYghEPRwZrlhDcLuqsJZtKQS20Kl38/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMtbmV0c3RvcmFn/ZS5ncm93dy5pbi9z/dG9jay1hc3NldHMv/bG9nb3MyL1dJUFJP/LndlYnA" },
    { name: "Netflix", logo: "https://cdn.brandfetch.io/netflix.com/w/200/h/200?c=1idgmB7XJ8" },
    { name: "TCS", logo: "https://imgs.search.brave.com/BgUuOpgae11C1rMadPusA4Q485XPk6zOZ8zEoodBtNE/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2lraWEubm9j/b29raWUubmV0L2xv/Z29wZWRpYS9pbWFn/ZXMvYS9hOS9UQ1Nf/NTBfVGF0YV9Db25z/dWx0YW5jeV9TZXJ2/aWNlcy5wbmcvcmV2/aXNpb24vbGF0ZXN0/L3NjYWxlLXRvLXdp/ZHRoLWRvd24vMzAw/P2NiPTIwMjEwNjA3/MDc0MjE4" },
    { name: "HCL Tech", logo: "https://imgs.search.brave.com/UXdu-jDUgt1iYA7a1SHq87deeA2QmKA2-fjpxsaoGZk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bG9nby53aW5lL2Ev/bG9nby9IQ0xfVGVj/aG5vbG9naWVzL0hD/TF9UZWNobm9sb2dp/ZXMtTG9nby53aW5l/LnN2Zw" }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. HERO SECTION (Search Active) */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Find Your <span className="text-blue-600">Dream Job</span> Today
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Connecting talent with opportunity. Thousands of jobs in engineering, design, and technology are waiting for you.
          </p>

          {/* SEARCH BOX */}
          <div className="bg-white p-2 rounded-full shadow-lg border border-gray-200 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto">
            <div className="flex-1 relative flex items-center px-4">
              <Search className="text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Job title, keywords..." 
                className="w-full p-3 outline-none text-gray-700 bg-transparent"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </div>
            <div className="w-px h-8 bg-gray-200 hidden md:block self-center"></div>
            <div className="flex-1 relative flex items-center px-4">
              <MapPin className="text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Location (City, Zip)..." 
                className="w-full p-3 outline-none text-gray-700 bg-transparent"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* --- JOBS LIST REMOVED FROM HERE --- */}

      {/* 2. Top Companies Logos (Same Design) */}
      <div className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-wide mb-2">
            Trusted by Top Companies
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-10"></div>

          <div className="flex flex-wrap justify-center gap-10 items-center">
            {companies.map((company, index) => (
              <div 
                key={index} 
                className="w-32 h-32 bg-white rounded-full flex items-center justify-center p-6 shadow-md border border-gray-100 hover:scale-110 hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer relative group"
                title={company.name}
              >
                <img 
                  src={company.logo} 
                  alt={company.name}
                  className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none'; 
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="hidden text-slate-800 font-bold text-sm text-center">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Stats Section (Same Design) */}
      <div className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <h3 className="text-5xl font-extrabold text-blue-600 mb-2">10k+</h3>
            <p className="text-gray-500 font-medium uppercase tracking-wide">Active Jobs</p>
          </div>
          <div className="p-6 border-l-0 md:border-l border-gray-100">
            <h3 className="text-5xl font-extrabold text-purple-600 mb-2">500+</h3>
            <p className="text-gray-500 font-medium uppercase tracking-wide">Companies</p>
          </div>
          <div className="p-6 border-l-0 md:border-l border-gray-100">
            <h3 className="text-5xl font-extrabold text-green-600 mb-2">1M+</h3>
            <p className="text-gray-500 font-medium uppercase tracking-wide">Job Seekers</p>
          </div>
        </div>
      </div>

      {/* 4. Call to Action (Same Design) */}
      <div className="py-24 px-4 text-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
          Ready to Start Your Career?
        </h2>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Your dream job is just a click away. Join the fastest growing job platform 
          and get hired by top industry leaders.
        </p>
        <Link 
          to="/jobs" 
          className="inline-block bg-blue-600 text-white text-lg font-bold px-10 py-4 rounded-full shadow-lg shadow-blue-300 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
        >
          Browse All Jobs &rarr;
        </Link>
      </div>

    </div>
  );
};

export default Home;