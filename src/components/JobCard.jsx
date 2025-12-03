import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  
  const jobType = job.type || job.jobType || job.job_type || "Full Time";
  const jobLocation = job.location || "Remote";
  const jobTitle = job.title || "Software Engineer";
  const jobCompany = job.company || "Unknown Company";
  const jobDesc = job.description || "No description available.";

  let displaySalary = "Not Disclosed";
  if (job.salary) {
    displaySalary = job.salary; 
  } else if (job.salaryMin && job.salaryMax) {
    displaySalary = `₹${job.salaryMin} - ₹${job.salaryMax}`; 
  }
  const companyInitial = jobCompany ? jobCompany[0] : "C";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
      
      {/* Top Section: Icon & Title */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          {/* Company Logo */}
          <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl font-bold text-blue-600 uppercase">
            {companyInitial}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">{jobTitle}</h3>
            <p className="text-sm text-gray-500 font-medium">{jobCompany}</p>
          </div>
        </div>
      </div>

      {/* Middle Section: Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
          {jobType}
        </span>
        <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          {displaySalary}
        </span>
        <span className="bg-purple-50 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
           Fresher/Exp
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-600 text-sm line-clamp-2">
        {jobDesc}
      </p>

      {/* Bottom Section */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center text-gray-500 text-sm">
          📍 {jobLocation}
        </div>
        <Link 
          to={`/job/${job.id}`} 
          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          Apply Now
        </Link>
      </div>

    </div>
  );
};

export default JobCard;