"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import ReactMarkdown from "react-markdown";

export default function NewNote() {
  const [user] = useAuthState(auth);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    if (!user) return alert("You must be logged in");

    try {
      await addDoc(collection(db, "notes"), {
        uid: user.uid,
        title,
        content,
        createdAt: serverTimestamp(),
      });

      alert("Note saved!");
      router.push("/notes"); // Go back to notes list (we’ll build this soon)
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Failed to save note");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">➕ Create New Note</h1>

      <input
        type="text"
        className="w-full p-3 rounded bg-gray-800 border border-gray-700 mb-4"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Markdown Input */}
        <textarea
          className="w-full h-80 p-4 bg-gray-800 border border-gray-700 rounded"
          placeholder="Write your Markdown note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Markdown Preview */}
        <div className="w-full h-80 p-4 bg-gray-800 border border-gray-700 rounded overflow-auto prose prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-6 px-6 py-3 bg-blue-500 rounded text-white hover:bg-blue-600 transition"
      >
        Save Note
      </button>
    </div>
  );
}
