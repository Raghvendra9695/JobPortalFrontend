import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobCard from './JobCard';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://jobportalbackend-5-ogdm.onrender.com');
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          All Available Jobs <span className="text-blue-600">({jobs.length})</span>
        </h1>

        {loading ? (
          <p className="text-center">Loading jobs...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;