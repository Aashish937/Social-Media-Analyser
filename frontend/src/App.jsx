import React, { useState, useEffect } from "react";
import FileUploader from "./components/FileUploader";
import SuggestionCard from "./components/SuggestionCard";
import { extractTextFromImage } from "./services/ocr";
import { extractTextFromPDF } from "./services/pdfExtractor";
import { analyzeText as heuristicAnalyze } from "./utils/suggestions";

export default function App() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState(null);

  // 🔹 Automatically extract text when file changes
  useEffect(() => {
    if (!file) return;

    const extract = async () => {
      setLoading(true);
      setError("");
      setProgress(0);
      setExtractedText("");
      setSuggestions(null);

      try {
        let text = "";
        if (file.type === "application/pdf" || file.name.match(/\.pdf$/i)) {
          text = await extractTextFromPDF(file, (p) => setProgress(p));
        } else if (
          file.type.startsWith("image/") ||
          file.name.match(/\.(jpe?g|png|bmp|tiff|webp)$/i)
        ) {
          text = await extractTextFromImage(file, (progressObj) =>
            setProgress(progressObj.progress ? Math.round(progressObj.progress * 100) : progressObj)
          );
        } else {
          throw new Error("Unsupported file type. Upload PDF or image.");
        }

        if (!text.trim()) throw new Error("No text could be extracted.");
        setExtractedText(text);

        // 🔹 Automatically analyze heuristically
        const heuristic = heuristicAnalyze(text, file);
        setSuggestions(heuristic);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to extract text.");
      } finally {
        setLoading(false);
      }
    };

    extract();
  }, [file]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-purple-900 text-white py-6 shadow-md z-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Social Media Content Analyzer</h1>
          <p className="mt-2 text-sm md:text-base opacity-90">
            Upload a PDF or image → Automatic Text Extraction & Suggestions 🚀
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 container mx-auto px-4 py-6 mt-32">
        <div className="bg-gray-100 rounded-2xl shadow-lg p-6 md:p-10">
          <FileUploader onFileSelected={setFile} disabled={loading} />

          {/* Loading */}
          {loading && (
            <div className="mt-6 text-center">
              <strong className="text-lg">Processing...</strong>
              <div className="mt-4 w-full bg-gray-300 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-indigo-600 h-3 transition-all duration-300"
                  style={{ width: progress ? `${progress}%` : "20%" }}
                ></div>
              </div>
              <p className="text-sm mt-2 text-gray-600">
                {typeof progress === "number" ? `${progress}% completed` : "Working..."}
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Results */}
          {file && extractedText && (
            <section className="mt-8">
              <h2 className="text-2xl font-extrabold mb-6 text-center 
                bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                text-transparent bg-clip-text tracking-wide drop-shadow-md">
                Results for: {file.name}
              </h2>

              {/* Image Preview */}
              {file.type.startsWith("image/") && (
                <div className="flex justify-center mb-6">
                  <div className="relative rounded-xl p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 shadow-lg">
                    <img
                      alt={file.name}
                      src={URL.createObjectURL(file)}
                      className="max-h-60 rounded-lg border-4 border-gray-900 object-cover"
                    />
                    <div className="absolute top-2 right-2 text-white text-lg opacity-80">🖼️</div>
                  </div>
                </div>
              )}

              {/* Extracted Text */}
              <div className="w-full mx-auto p-8 bg-gray-900 text-gray-200 rounded-2xl shadow-lg mt-6">
                <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 text-transparent bg-clip-text">
                  Extracted Text
                </h3>

                <div className="bg-gray-900 border-gray-900 shadow-md rounded-2xl p-4 max-h-80 overflow-y-auto scrollbar-hide">
                  <p className="whitespace-pre-line text-gray-300 leading-relaxed text-sm font-mono text-justify">
                    {extractedText}
                  </p>
                </div>

                <div className="text-xs text-gray-500 mt-2 text-right">
                  {extractedText.length} characters extracted
                </div>
              </div>

              {/* Suggestions */}
              {suggestions && (
                <div className="mt-10">
                  <SuggestionCard suggestions={suggestions} />
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-4 text-center text-sm">
        <p>⚡ Extract text first, then analyze for content improvements.</p>
      </footer>
    </div>
  );
}
