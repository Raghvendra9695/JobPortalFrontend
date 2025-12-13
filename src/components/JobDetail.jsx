import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(false); 

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJob = async () => {
      try {
        const response = await axios.get(`https://jobportalbackend-ie98.onrender.com/api/jobs/${id}`);
        setJob(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Could not load job details.");
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  // ✅ Apply Job Logic
  const handleApply = async () => {
    // 1. Check Login
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
      alert("Please Login first to apply for this job!");
      navigate('/login');
      return;
    }

    
    if (user.role === 'EMPLOYER') {
      alert("Employers cannot apply for jobs!");
      return;
    }

    if(!confirm(`Apply for ${job.title} at ${job.company}?`)) return;

    setApplying(true);

    try {
      // 3. API Call
      await axios.post(
        `https://jobportalbackend-ie98.onrender.com/api/applications/apply/${id}`, 
        {}, // Body empty hai
        {
          headers: { Authorization: `Bearer ${token}` } // Header jaruri hai
        }
      );

      alert("🎉 Application Submitted Successfully!");
      navigate('/dashboard'); 

    } catch (err) {
      console.error("Apply Error:", err);
    
      alert(err.response?.data || "Failed to apply. Please try again.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="text-center mt-20 text-blue-600">Loading details...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;
  if (!job) return <div className="text-center mt-20 text-gray-500">Job not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link to="/jobs" className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block">
          &larr; Back to Jobs
        </Link>

        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
              <p className="text-lg text-gray-600 mt-1 font-medium">
                {job.company} • {job.location}
              </p>
            </div>
            
            {/* ✅ Apply Button Updated */}
            <button 
              onClick={handleApply}
              disabled={applying} 
              className={`px-8 py-3 rounded-lg font-bold text-white transition shadow-lg w-full md:w-auto 
                ${applying ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {applying ? 'Applying...' : 'Apply Now'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column: Description */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Job Description</h2>
            <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Right Column: Sidebar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Job Overview</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Salary</p>
                <p className="font-semibold text-slate-800">
                  {job.salary || (job.salaryMin ? `₹${job.salaryMin} - ₹${job.salaryMax}` : "Not Disclosed")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Job Type</p>
                <p className="font-semibold text-slate-800">
                  {job.type || job.jobType || "Full Time"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold text-slate-800">{job.location}</p>
              </div>
            </div>

            <hr className="my-4 border-gray-200"/>
            
            <button className="w-full bg-slate-900 text-white py-2 rounded-lg font-medium hover:bg-slate-800 transition">
              Save Job
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default JobDetail;