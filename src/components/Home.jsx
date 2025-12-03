import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import Hero from './Hero';
import JobCard from './JobCard';

const Home = () => {
  const [jobs, setJobs] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    
    const fetchJobs = async () => {
      try {
      
        const response = await axios.get('http://localhost:8080/api/jobs');
        
        console.log("Data from Backend:", response.data);
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Is Backend running?");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); 

  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Loading State */}
        {loading && (
          <p className="text-center text-blue-600 text-lg">Loading jobs from server...</p>
        )}

        {/* Error State */}
        {error && (
          <p className="text-center text-red-500 text-lg">{error}</p>
        )}

        {/* Data Show Karein */}
        {!loading && !error && (
          <>
            <h2 className="text-3xl font-bold text-slate-800 mb-8">
              Featured Jobs <span className="text-blue-600">({jobs.length})</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Home;