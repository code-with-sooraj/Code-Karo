import React, { useEffect, useState } from "react";
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

const CodeEditor2 = ({ isDarkMode }) => {
  const [code, setCode] = useState(boilerplateCode.python);
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");

  const theme = isDarkMode ? "vs-dark" : "light";

  const submitCode = async () => {
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
      setOutput(data.output || "No output returned");
    } catch (error) {
      console.error("Error:", error);
      setOutput("Error running code: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      <div className="w-full max-w-6xl">
        {/* Language Selector and Submit Button */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <select
            className={`px-4 py-2 border rounded ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              setCode(boilerplateCode[e.target.value]);
            }}
          >
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>

          <button
            className={`px-4 py-2 ${
              isDarkMode ? "bg-teal-600 hover:bg-teal-700" : "bg-teal-500 hover:bg-teal-600"
            } text-white rounded`}
            onClick={submitCode}
          >
            SUBMIT
          </button>
        </div>

        {/* Monaco Code Editor */}
        <div className="w-full">
          <Editor
            onChange={(value) => setCode(value || "")}
            height="60vh"
            language={language}
            value={code}
            theme={theme}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
          />
        </div>

        {/* Output Section */}
        <div
          className={`w-full mt-4 p-4 border rounded ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
          }`}
        >
          <h2 className="text-lg font-bold mb-2">Output:</h2>
          <pre className="whitespace-pre-wrap break-words">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor2;
