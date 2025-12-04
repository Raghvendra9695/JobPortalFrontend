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
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* ✅ NEW LOGO SECTION */}
          <Link to="/" className="flex items-center gap-3">
             {/* Professional AI Logo */}
             <img 
                src="https://cdn-icons-png.flaticon.com/128/2103/2103633.png" 
                alt="CareerVision AI Logo" 
                className="w-10 h-10 object-contain"
             />
             <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
               CareerVision<span className="text-slate-800"> AI</span>
             </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/jobs" className="text-gray-600 hover:text-blue-600 font-medium transition">Find Jobs</Link>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition">Companies</a>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none hover:bg-gray-50 p-2 rounded-full transition"
                >
                  <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {user.name[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-gray-50">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    {user.role === 'EMPLOYER' && (
                      <Link 
                        to="/dashboard" 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                    )}

                    <Link 
                        to="/profile" 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User size={16} /> My Profile
                    </Link>

                    <button 
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition mt-1"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2">Login</Link>
                <Link to="/register" className="bg-slate-900 text-white px-5 py-2 rounded-full font-medium hover:bg-slate-800 transition shadow-md">
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