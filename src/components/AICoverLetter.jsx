import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles, Copy, RefreshCw, Send } from 'lucide-react';

const AICoverLetter = () => {
  const [formData, setFormData] = useState({
    userName: '',
    companyName: '',
    jobTitle: '',
    jobDescription: '',
    userSkills: ''
  });

  const [generatedLetter, setGeneratedLetter] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle AI Generation
  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedLetter('');

    try {
      // ⚠️ Dhyan dena: Yahan apna Backend URL sahi dalna
      const response = await axios.post('https://jobportalbackend-5-ogdm.onrender.com/api/ai/generate-cover-letter', formData);
      
      setGeneratedLetter(response.data); // AI ka jawab yahan aayega
    } catch (error) {
      console.error("Error generating letter:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Copy to Clipboard Function
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    alert("Cover Letter Copied! 📋");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex justify-center items-center gap-2">
            <Sparkles className="text-yellow-500" /> 
            AI Cover Letter Generator
          </h1>
          <p className="text-gray-600 mt-2">Generate a professional cover letter in seconds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT SIDE: INPUT FORM */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Details</h2>
            <form onSubmit={handleGenerate} className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="userName" required 
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Raghvendra Yadav" onChange={handleChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Target Company</label>
                <input type="text" name="companyName" required 
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Google" onChange={handleChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <input type="text" name="jobTitle" required 
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Backend Developer" onChange={handleChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Your Key Skills</label>
                <input type="text" name="userSkills" required 
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Java, Spring Boot, AWS" onChange={handleChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Job Description (Short)</label>
                <textarea name="jobDescription" rows="3"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Paste brief job requirements here..." onChange={handleChange}></textarea>
              </div>

              <button type="submit" disabled={loading}
                className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-medium 
                ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {loading ? (
                  <> <RefreshCw className="animate-spin" size={18} /> Generating Magic... </>
                ) : (
                  <> <Sparkles size={18} /> Generate Cover Letter </>
                )}
              </button>

            </form>
          </div>

          {/* RIGHT SIDE: AI OUTPUT */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">AI Generated Result</h2>
              {generatedLetter && (
                <button onClick={handleCopy} className="text-gray-500 hover:text-blue-600 flex items-center gap-1 text-sm">
                  <Copy size={16} /> Copy
                </button>
              )}
            </div>

            <div className="flex-grow bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-y-auto whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Sparkles className="animate-pulse mb-2 text-yellow-400" size={32} />
                  <p>AI is thinking...</p>
                </div>
              ) : generatedLetter ? (
                generatedLetter
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Send size={32} className="mb-2 opacity-20" />
                  <p>Fill the form and hit generate!</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AICoverLetter;