"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function NotesPage() {
  const [markdown, setMarkdown] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">📝 Markdown Editor</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Textarea for writing */}
        <textarea
          className="w-full h-96 p-4 bg-gray-800 border border-gray-700 rounded"
          placeholder="Type your markdown note here..."
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />

        {/* Live Markdown preview */}
        <div className="w-full h-96 p-4 bg-gray-800 border border-gray-700 rounded overflow-auto prose prose-invert max-w-none">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
