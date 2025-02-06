import React, { useEffect, useState } from 'react';
import Editor from "@monaco-editor/react";

const boilerplateCode = {
  python: `# Python Boilerplate
def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
  java: `// Java Boilerplate
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  cpp: `// C++ Boilerplate
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
};

const CodeEditor = ({ isDarkMode }) => {
  const [code, setCode] = useState(boilerplateCode.python);
  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState("vs-dark");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCode = localStorage.getItem("code");
    if (savedCode) setCode(savedCode);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("code", code);
  }, [code]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(boilerplateCode[selectedLanguage]);
  };

  const submitCode = async () => {
    if (!code.trim()) {
      setOutput("Please write some code.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language, code }),
      });

      if (!response.ok) {
        throw new Error("Failed to execute code");
      }

      const data = await response.json();
      console.log("API Response:", data); // Log the response to see what's returned
      setOutput(data.output || "No output returned");
    } catch (error) {
      console.error("Error:", error);
      setOutput(`Error running code: ${error.message}`);
    } finally {
      setLoading(false);
    }
};


  return (
    <div className={`flex flex-col items-center p-4 min-h-screen ${isDarkMode === "dark" ? "bg-gray-800" : theme === "light" ? "bg-gray-100" : "bg-black"}`}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mb-4">

        {/* Controls Section */}
        <div className="flex flex-wrap gap-4 w-full md:w-auto justify-center">
          <select
            className="px-4 py-2 border rounded bg-white text-black shadow-md md:w-auto w-full"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>

          <select
            className="px-4 py-2 border rounded bg-white text-black shadow-md md:w-auto w-full"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
            <option value="hc-black">High Contrast</option>
          </select>

          <button
            className="px-4 py-2 bg-teal-500 text-white rounded shadow-md hover:bg-teal-600 transition w-full md:w-auto"
            onClick={submitCode}
            disabled={loading}
          >
            {loading ? (
              <span>Running...</span>
            ) : (
              <span>SUBMIT</span>
            )}
          </button>
        </div>
      </div>

      {/* Code Editor Section */}
      <div className={`w-full max-w-6xl shadow-lg rounded-lg p-4 ${theme === "vs-dark" ? "bg-gray-800" : theme === "light" ? "bg-white" : "bg-black"}`}>
      <Editor
          onChange={(value) => setCode(value || "")}
          height="70vh"
          language={language}
          value={code}
          theme={theme}
        />

        {/* Output Section */}
        <div className={`w-full mt-4 p-4 border rounded-lg ${theme === "vs-dark" ? "bg-gray-800 text-white" : theme === "light" ? "bg-gray-200 text-black" : "bg-black text-white"} shadow-md overflow-auto`}>
        <h2 className="text-lg font-bold mb-2">Output:</h2>
        <pre className={`whitespace-pre-wrap ${theme === "vs-dark" ? "text-green-400" : theme === "light" ? "text-black" : "text-yellow-400"}`}>
            {output}
        </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
