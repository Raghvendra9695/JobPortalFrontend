import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud, FileText, CheckCircle, XCircle, Activity, Loader2 } from 'lucide-react';

const AtsScorer = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== 'application/pdf') {
      setError('Please upload a PDF file only.');
      setFile(null);
      return;
    }
    setError('');
    setFile(selectedFile);
  };

  const handleScan = async (e) => {
    e.preventDefault();
    if (!file || !jobDescription.trim()) {
      setError('Please upload a resume and enter the job description.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    // File bhejne ke liye FormData ka use hota hai
    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobDescription', jobDescription);

    try {
      
const response = await axios.post('http://localhost:8080/api/ai/ats-score', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
      

      // AI se jo JSON text aayega usko parse karna
      let parsedResult = response.data;
      if (typeof parsedResult === 'string') {
        parsedResult = JSON.parse(parsedResult);
      }
      setResult(parsedResult);
      
    } catch (err) {
      console.error("Error calculating ATS score:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Score ke hisaab se color decide karna
  const getScoreColor = (score) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 flex justify-center items-center gap-3">
            <Activity className="text-blue-600" size={36} /> 
            AI ATS Resume Scanner
          </h1>
          <p className="text-gray-600 mt-3 text-lg">Check how well your resume matches the job description.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT SIDE: INPUT FORM */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <FileText className="text-blue-500" /> Upload Details
            </h2>
            
            <form onSubmit={handleScan} className="space-y-6">
              
              {/* File Upload Box */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume (PDF)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-500 transition-colors bg-gray-50">
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-2 py-1">
                        <span>Upload a file</span>
                        <input type="file" accept=".pdf" className="sr-only" onChange={handleFileChange} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PDF up to 5MB</p>
                    {file && <p className="text-sm font-semibold text-green-600 mt-2">📄 {file.name}</p>}
                  </div>
                </div>
              </div>

              {/* Job Description Textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                <textarea 
                  rows="6"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="Paste the target job description here..." 
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                ></textarea>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button 
                type="submit" 
                disabled={loading || !file}
                className={`w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl shadow-md text-white font-bold text-lg transition-all
                ${(loading || !file) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'}`}>
                {loading ? (
                  <> <Loader2 className="animate-spin" size={24} /> Scanning Resume... </>
                ) : (
                  <> <Activity size={24} /> Scan My Resume </>
                )}
              </button>

            </form>
          </div>

          {/* RIGHT SIDE: AI RESULT */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">ATS Analysis Result</h2>
            
            <div className="flex-grow flex flex-col">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                  <Activity className="animate-pulse text-blue-500" size={48} />
                  <p className="text-lg">AI is analyzing keywords...</p>
                </div>
              ) : result ? (
                <div className="space-y-8 animate-in fade-in duration-500">
                  
                  {/* Score Circle */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative flex items-center justify-center w-32 h-32 bg-gray-50 rounded-full border-8 border-gray-100 shadow-inner">
                      <span className={`text-4xl font-extrabold ${getScoreColor(result.score)}`}>
                        {result.score}%
                      </span>
                    </div>
                    <p className="mt-3 text-gray-600 font-medium text-lg">Match Score</p>
                  </div>

                  {/* Skills Section */}
                  <div className="space-y-6">
                    {/* Matched Skills */}
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                      <h3 className="flex items-center gap-2 text-green-800 font-bold mb-2">
                        <CheckCircle size={20} className="text-green-600"/> Matched Skills
                      </h3>
                      <p className="text-green-700 text-sm leading-relaxed">{result.matchedSkills || "None found"}</p>
                    </div>

                    {/* Missing Skills */}
                    <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                      <h3 className="flex items-center gap-2 text-red-800 font-bold mb-2">
                        <XCircle size={20} className="text-red-600"/> Missing Skills (To Add)
                      </h3>
                      <p className="text-red-700 text-sm leading-relaxed">{result.missingSkills || "None found"}</p>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
                  <FileText size={64} className="mb-4" />
                  <p className="text-lg text-center">Upload a resume and job description <br/>to see your match score.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AtsScorer;