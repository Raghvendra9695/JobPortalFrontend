import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Users, Eye, PlusCircle, Trash2, Edit } from 'lucide-react'; // Icons import kiye
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    if (parsedUser.role !== 'EMPLOYER') {
      alert("Access Denied! Only Employers can view Dashboard.");
      navigate('/');
      return;
    }
    fetchMyJobs(parsedUser.email);
  }, [navigate]);

  const fetchMyJobs = async (email) => {
    try {
    
      const response = await axios.get('https://jobportalbackend-ie98.onrender.com/api/jobs')
      setMyJobs(response.data.slice(0, 5)); 
      setLoading(false);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if(confirm("Are you sure you want to delete this job?")) {
        alert("Delete feature coming soon!");
    }
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Employer Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, <span className="text-blue-600 font-semibold">{user.name}</span>!</p>
          </div>
          <Link 
            to="/post-job" 
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
          >
            <PlusCircle size={20} />
            Post New Job
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Briefcase size={28} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Active Jobs</p>
              <h3 className="text-2xl font-bold text-slate-800">{myJobs.length}</h3>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <Users size={28} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Applicants</p>
              <h3 className="text-2xl font-bold text-slate-800">12</h3> {/* Dummy Data */}
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <Eye size={28} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Profile Views</p>
              <h3 className="text-2xl font-bold text-slate-800">450</h3> {/* Dummy Data */}
            </div>
          </div>
        </div>

        {/* Recent Jobs Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">Recent Posted Jobs</h3>
            <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-500 text-sm border-b border-gray-100">
                  <th className="px-6 py-3 font-medium">Job Title</th>
                  <th className="px-6 py-3 font-medium">Date Posted</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Applicants</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {loading ? (
                  <tr><td colSpan="5" className="px-6 py-4 text-center">Loading...</td></tr>
                ) : myJobs.map((job) => (
                  <tr key={job.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-slate-900">{job.title}</td>
                    <td className="px-6 py-4">Today</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">Active</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                         {/* Dummy Avatars */}
                         <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                         <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                         <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs border-2 border-white">+3</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-3">
                      <button className="text-blue-500 hover:text-blue-700"><Edit size={18}/></button>
                      <button onClick={() => handleDelete(job.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;