import React, { useRef, useState } from "react";

export default function FileUploader({ onFileSelected, disabled }) {
  const inputRef = useRef();
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState("");

  function handleFiles(files) {
    if (!files || files.length === 0) return;
    const file = files[0];
    setFileName(file.name); // store file name
    onFileSelected(file);
  }

  return (
    <div className="w-full">
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 cursor-pointer transition-all duration-300
          ${dragOver ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-gray-100 hover:bg-gray-200"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        {/* Upload Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-indigo-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0l-4 4m4-4l4 4M17 8v12m0 0l-4-4m4 4l4-4" />
        </svg>

        {/* Upload Instructions */}
        <p className="text-gray-900 font-semibold text-center mb-2">
          Drag & drop a <span className="text-indigo-600">PDF</span> or <span className="text-indigo-600">image</span> here
        </p>
        <p className="text-sm text-gray-700 font-medium mb-4">or click below to select a file</p>

        {/* Choose File Button */}
        <button
          onClick={() => inputRef.current.click()}
          disabled={disabled}
          className="px-5 py-2 rounded-xl bg-purple-700 text-white text-sm font-semibold shadow-md hover:bg-purple-900 transition disabled:opacity-50"
        >
          Choose File
        </button>

        {/* File Input */}
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,image/*"
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />

        {/* File Preview */}
        {fileName && (
          <p className="mt-4 text-gray-500 text-sm font-medium text-center">
            📄 {fileName}
          </p>
        )}
      </div>
    </div>
  );
}
