import React from "react";

const ToggleView = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex justify-center mb-4">
      <button
        className={`px-4 py-2 mx-2 rounded ${viewMode === "12H" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        onClick={() => setViewMode("12H")}
      >
        12-Hour View
      </button>
      <button
        className={`px-4 py-2 mx-2 rounded ${viewMode === "24H" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        onClick={() => setViewMode("24H")}
      >
        24-Hour View
      </button>
    </div>
  );
};

export default ToggleView;
