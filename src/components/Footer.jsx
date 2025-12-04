import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Brand Info */}
          <div className="col-span-1 md:col-span-1">
            {/* ✅ NEW FOOTER LOGO */}
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img 
                src="https://cdn-icons-png.flaticon.com/128/2103/2103633.png" 
                alt="CareerVision AI Logo" 
                // Brightness filter taaki dark background par chamke
                className="w-9 h-9 brightness-200 contrast-125" 
              />
              <h2 className="text-2xl font-bold text-white">CareerVision AI</h2>
            </Link>
            
            <p className="text-sm leading-relaxed text-slate-400">
              Your gateway to a better future. We connect the best talent with top-tier companies worldwide using AI technology.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/jobs" className="hover:text-blue-400 transition">Find Jobs</Link></li>
              <li><Link to="/companies" className="hover:text-blue-400 transition">Companies</Link></li>
              <li><Link to="/salaries" className="hover:text-blue-400 transition">Salaries</Link></li>
              <li><Link to="/login" className="hover:text-blue-400 transition">Login / Register</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Resume Guide</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Career Advice</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter/Social */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Stay Connected</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition"><Facebook size={18}/></a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-blue-400 hover:text-white transition"><Twitter size={18}/></a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-blue-700 hover:text-white transition"><Linkedin size={18}/></a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-pink-600 hover:text-white transition"><Instagram size={18}/></a>
            </div>
            <p className="text-xs text-slate-500">
              © 2025 CareerVision AI. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;