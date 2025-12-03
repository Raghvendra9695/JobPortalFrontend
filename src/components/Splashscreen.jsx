import React, { useEffect, useState } from 'react';

const SplashScreen = () => {
  // Progress bar animation ke liye state
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 100ms par progress badhayenge taaki bar fill hota hua dikhe
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4; // Har baar thoda badhega (adjust speed here)
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      
      {/* Logo Section */}
      <div className="mb-8 animate-pulse">
        <h1 className="text-5xl font-extrabold text-blue-600 tracking-widest">
          Job<span className="text-slate-900">Portal</span>
          <span className="text-blue-500 text-6xl">.</span>
        </h1>
      </div>

      {/* Simple Loading Bar */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-gray-400 mt-4 text-sm font-medium">
        Loading opportunities...
      </p>

    </div>
  );
};

export default SplashScreen;