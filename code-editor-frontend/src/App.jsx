import React, { useState, useEffect } from "react";
import CodeEditor from "./components/CodeEditor";
import QuestionCard from "./components/QuestionCard";
import { FaSun, FaMoon } from "react-icons/fa"; // Icons for light and dark mode

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle theme between dark and light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Set the theme for the entire app
  const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";

  // Effect to set the background color of the body according to theme
  useEffect(() => {
    document.body.className = isDarkMode ? "bg-gray-900" : "bg-gray-100"; // Apply background color to body
  }, [isDarkMode]);

  return (
    <div className={`flex flex-col h-screen p-4 ${themeClass}`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
      >
        {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>

      <h1 className="text-2xl font-semibold text-center mb-6">Code Blogs</h1>

      {/* Responsive Layout */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
        {/* Question Card */}
        <div className="w-full md:w-2/5 lg:w-1/3 xl:w-1/4 px-4">
          <QuestionCard isDarkMode={isDarkMode} />
        </div>

        {/* Code Editor */}
        <div className="w-full md:w-3/5 lg:w-2/3 xl:w-3/4">
          <CodeEditor isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
}

export default App;
