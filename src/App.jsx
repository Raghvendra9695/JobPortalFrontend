import PostJob from './components/PostJob';
import Dashboard from './components/Dashboard';
import JobDetail from './components/JobDetail';
import Register from './components/Register';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import SplashScreen from './components/Splashscreen'; 

function App() {
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Agar Loading hai to Splash Screen dikhao, nahi to puri App */}
      {isLoading ? (
        <SplashScreen />
      ) : (
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/job/:id" element={<JobDetail />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;