import React from "react";

const QuestionCard = ({ isDarkMode }) => {
  const cardClass = isDarkMode
    ? "bg-gray-800 text-white p-6 rounded-lg shadow-lg"
    : "bg-white text-gray-900 p-6 rounded-lg shadow-lg";

  // Determine the color for input and output based on theme
  const inputOutputClass = isDarkMode ? "text-yellow-400" : "text-red-600";
  const testCaseClass = isDarkMode ? "text-black-400" : " text-white-600";
    const testCaseBoxClass = isDarkMode ? "bg-white-600 border-yellow-400" : " bg-black-400 border-blue-600";

  return (
    <div className={cardClass}>
      <h2 className="text-2xl font-semibold mb-4 font-serif">Bubble Sort Algorithm</h2>

      {/* Explanation */}
      <p className="text-sm mb-4 font-sans">
        In this problem, you are asked to implement the Bubble Sort algorithm. 
        Bubble Sort is a simple sorting algorithm that repeatedly steps through 
        the list, compares adjacent elements, and swaps them if they are in the wrong order. 
        The process is repeated until the list is sorted.
      </p>

      {/* Test Case 1 */}
      <div className={` p-4 rounded-lg mb-4 ${testCaseBoxClass}`}>
        <h3 className={`text-lg font-semibold mb-2 font-mono ${testCaseClass}`}>Test Case 1:</h3>
        <pre className={`text-sm ${inputOutputClass}`}>
          Input: [5, 1, 4, 2, 8]
        </pre>
        <pre className={`text-sm ${inputOutputClass}`}>
            Output: [1, 2, 4, 5, 8]
        </pre>
      </div>

      {/* Test Case 2 */}
      <div className={` p-4 rounded-lg mb-4 ${testCaseBoxClass}`}>
      <h3 className={`text-lg font-semibold mb-2 font-mono ${testCaseClass}`}>Test Case 2:</h3>
      <pre className={`text-sm ${inputOutputClass}`}>
          Input: [3, 0, 2, 5, -1, 4, 1]
        </pre>
        <pre className={`text-sm ${inputOutputClass}`}>
            Output: [-1, 0, 1, 2, 3, 4, 5]
        </pre>
      </div>

      {/* Algorithm Explanation */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold font-serif">Algorithm Explanation:</h3>
        <p className="text-sm mb-2 font-sans">
          The algorithm works by repeatedly comparing adjacent elements and swapping them 
          if they are in the wrong order. The largest unsorted element "bubbles" up to 
          its correct position after each pass through the list.
        </p>
        <p className="text-sm font-sans">
          The time complexity of Bubble Sort is O(n²), where n is the number of elements 
          in the list. It is inefficient for large datasets.
        </p>
      </div>
    </div>
  );
};

export default QuestionCard;
