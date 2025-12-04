import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components Imports
import Navbar from './components/Navbar';
import Home from './components/Home';      // Landing Page (Light Theme)
import Jobs from './components/Jobs';      // Job Listings Page
import Login from './components/Login';
import Register from './components/Register';
import JobDetail from './components/JobDetail';
import PostJob from './components/PostJob';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';  // New Footer

function App() {
  return (
    <Router>
      {/* Wrapper div pure screen height lene ke liye */}
      <div className="flex flex-col min-h-screen">
        
        {/* Navbar Sabse Upar */}
        <Navbar />

        {/* Main Content Area */}
        {/* flex-grow lagane se ye area fail jayega aur Footer ko niche dhakel dega */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        {/* Footer Sabse Niche */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;