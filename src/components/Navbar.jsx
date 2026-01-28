import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100 w-full">
      
      {/* FULL WIDTH CONTAINER */}
      <div className="w-full px-6 py-3"> 
        <div className="flex justify-between items-center h-16">
          
          {/* ✅ LEFT SIDE: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3">
               <img 
                 src="https://cdn-icons-png.flaticon.com/128/2103/2103633.png" 
                 alt="CareerVision AI Logo" 
                 className="w-10 h-10 object-contain"
               />
               <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
                 CareerVision<span className="text-slate-800"> AI</span>
               </h1>
            </Link>
          </div>

          {/* ✅ MIDDLE: Links (Find Jobs & Companies) */}
          <div className="hidden md:flex space-x-8">
            <Link to="/jobs" className="text-gray-600 hover:text-blue-600 font-medium transition text-lg">
                Find Jobs
            </Link>
            
            {/* 🔥 COMPANIES OPTION ADDED BACK */}
            <Link to="/companies" className="text-gray-600 hover:text-blue-600 font-medium transition text-lg">
                Companies
            </Link>
          </div>

          {/* ✅ RIGHT SIDE: Auth Buttons / User Profile */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none hover:bg-gray-50 p-2 rounded-full transition border border-transparent hover:border-gray-200"
                >
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-base font-medium text-gray-700 hidden sm:block">{user.name}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    {(user.role === 'EMPLOYER' || user.role === 'RECRUITER') && (
                      <Link 
                        to="/dashboard" 
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <LayoutDashboard size={18} /> Dashboard
                      </Link>
                    )}

                    <Link 
                        to="/profile" 
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User size={18} /> My Profile
                    </Link>

                    <button 
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition mt-1 border-t border-gray-50"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2 text-lg transition">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-md shadow-blue-200 text-lg">
                  Register
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;