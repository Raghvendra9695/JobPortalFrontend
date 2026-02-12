import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    jobType: 'Full Time', 
    category: 'Engineering', 
    salaryMin: '',
    salaryMax: '',
    description: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      alert("Please Login first!");
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    const userRole = parsedUser.role?.toUpperCase();
    if (userRole !== 'EMPLOYER' && userRole !== 'RECRUITER') {
      alert("Only Employers/Recruiters can post jobs!");
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      const config = {
        headers: {
          'Authorization': `Bearer ${token}` // ✅ Token Header
        }
      };
      
      const payload = {
        ...jobData,
        salaryMin: Number(jobData.salaryMin),
        salaryMax: Number(jobData.salaryMax)
      };

      // ✅ Correct URL (5-ogdm wala)
      const response = await axios.post('https://jobportalbackend-5-ogdm.onrender.com/api/jobs/create', payload, config);
      
      console.log("Job Posted:", response.data);
      alert("Job Posted Successfully! 🚀");
      
      navigate('/dashboard'); 

    } catch (err) {
      console.error("Error posting job:", err);
      alert("Failed to post job. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null; 

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">Post a New Job 📢</h2>
          <p className="mt-2 text-gray-600">Find the best talent for your company</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Row 1: Title & Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                name="title"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Senior Java Developer"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                name="company"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Tech Corp"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 2: Location & Job Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Pune, India (Remote)"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Type</label>
              <select
                name="jobType"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                onChange={handleChange}
                value={jobData.jobType}
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Freelance</option>
              </select>
            </div>
          </div>

          {/* ✅ NEW ROW: Category (Ye Missing Tha!) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Category</label>
            <select
              name="category"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              onChange={handleChange}
              value={jobData.category}
            >
              <option>Engineering</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Sales</option>
              <option>Finance</option>
              <option>HR</option>
              <option>Customer Support</option>
              <option>Other</option>
            </select>
          </div>

          {/* Row 3: Salary Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Min Salary (₹)</label>
              <input
                type="number"
                name="salaryMin"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. 500000"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Salary (₹)</label>
              <input
                type="number"
                name="salaryMax"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. 1200000"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea
              name="description"
              rows="5"
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe the role, responsibilities and requirements..."
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-md transition duration-200 
              ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Posting Job...' : 'Post Job Now'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default PostJob;