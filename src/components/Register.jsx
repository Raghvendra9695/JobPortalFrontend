import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate import kiya
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate(); // Page badalne ke liye hook

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'seeker' // Default UI value
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Type karte waqt error hata do
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Password Match Check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError(null);

    // 2. Data Mapping (Frontend format -> Backend format)
    const payload = {
      name: formData.fullName, // Backend 'name' maangta hai, humare paas 'fullName' hai
      email: formData.email,
      password: formData.password,
      // Backend ko 'EMPLOYER' ya 'JOB_SEEKER' chahiye
      role: formData.role === 'recruiter' ? 'EMPLOYER' : 'JOB_SEEKER'
    };

    try {
      // 3. API Call
      const response = await axios.post('http://localhost:8080/api/auth/register', payload);
      
      console.log("Registration Success:", response.data);
      alert("Registration Successful! Please Login.");
      
      // 4. Redirect to Login Page
      navigate('/login');

    } catch (err) {
      console.error("Registration Error:", err);
      // Agar backend se message aaya to wo dikhao, nahi to default message
      setError(err.response?.data || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        
        <div className="text-center">
          <h2 className="mt-4 text-3xl font-extrabold text-slate-900">
            Create an Account 🚀
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join thousands of professionals today.
          </p>
        </div>

        {/* Error Message Show karne ke liye */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          {/* Role Selection (Toggle) */}
          <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                formData.role === 'seeker' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setFormData({...formData, role: 'seeker'})}
            >
              I'm a Job Seeker
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                formData.role === 'recruiter' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setFormData({...formData, role: 'recruiter'})}
            >
              I'm a Recruiter
            </button>
          </div>

          <div className="rounded-md shadow-sm space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                name="fullName"
                type="text"
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                name="email"
                type="email"
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="john@example.com"
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading} 
            className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white 
              ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
              transition duration-200`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;