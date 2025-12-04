import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';      
import Jobs from './components/Jobs';      
import Login from './components/Login';
import Register from './components/Register';
import JobDetail from './components/JobDetail';
import PostJob from './components/PostJob';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer'; 

function App() {
  return (
    <Router>
      
      <div className="flex flex-col min-h-screen">
        
      
        <Navbar />

        
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