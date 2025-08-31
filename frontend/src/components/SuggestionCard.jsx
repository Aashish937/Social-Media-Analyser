import React from "react";

export default function SuggestionCard({ suggestions }) {
  return (
    <div className="w-full mx-auto p-8 bg-gray-900 text-gray-200 rounded-2xl shadow-lg mt-6">
      {/* Header */}
      <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 text-transparent bg-clip-text">
        🚀 Engagement Suggestions
      </h3>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-sm">
        <div className="p-5 bg-gray-800 rounded-xl shadow text-center">
          <strong className="block text-blue-400 text-lg">Word Count</strong>
          <span className="text-base font-bold text-gray-300">
            {suggestions.stats.wordCount}
          </span>
        </div>
        <div className="p-5 bg-gray-800 rounded-xl shadow text-center">
          <strong className="block text-blue-400 text-lg">Hashtags</strong>
          <span className="text-base font-bold text-gray-300">
            {suggestions.stats.hashtags.length > 0
              ? suggestions.stats.hashtags.join(", ")
              : "None"}
          </span>
        </div>
        <div className="p-5 bg-gray-800 rounded-xl shadow text-center">
          <strong className="block text-blue-400 text-lg">Mentions</strong>
          <span className="text-base font-bold text-gray-300">
            {suggestions.stats.mentionCount}
          </span>
        </div>
      </div>

      {/* Advice Section */}
      <div className="space-y-4">
        {suggestions.advice.map((a, i) => (
          <div
            key={i}
            className="p-4 rounded-lg shadow-md text-sm transition bg-gray-800"
          >
            <strong className="text-purple-400 text-lg">{a.title} :</strong>{" "}
            <span>{a.recommendation}</span>
          </div>
        ))}
      </div>

      {/* AI Summary */}
      <div className="mt-8 p-5 bg-gray-800 rounded-lg shadow-lg">
        <strong className="text-purple-400 text-lg">
          🤖 ML Suggested Summary:
        </strong>
        <p className="text-gray-300 mt-2 leading-relaxed">
          {suggestions?.model?.summary
            ? suggestions.model.summary
            : "⚠️ No summary generated"}
        </p>
      </div>

      {/* Alt Text */}
      <div className="mt-6 p-5 bg-gray-800 rounded-lg shadow-lg">
        <strong className="text-purple-400 text-lg">🖼 Alt Text Suggestion:</strong>
        <p className="text-gray-300 mt-2 leading-relaxed">
          {suggestions.altText}
        </p>
      </div>
    </div>
  );
}
