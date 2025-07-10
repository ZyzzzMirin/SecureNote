"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import ReactMarkdown from "react-markdown";

export default function ViewNote() {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      if (!user || !id) return;

      try {
        const docRef = doc(db, "notes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.uid !== user.uid) {
            alert("Access denied");
            router.push("/notes");
            return;
          }

          setTitle(data.title);
          setContent(data.content);
        } else {
          alert("Note not found");
          router.push("/notes");
        }
      } catch (err) {
        console.error("Error fetching note:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, user]);

  const handleSave = async () => {
    try {
      const docRef = doc(db, "notes", id);
      await updateDoc(docRef, {
        title,
        content,
      });

      alert("Note updated!");
    } catch (err) {
      console.error("Failed to update:", err);
      alert("Error saving note");
    }
  };

  if (loading) {
    return <div className="p-8 text-white">Loading note...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">📝 View/Edit Note</h1>

      <input
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
        Save Changes
      </button>
    </div>
  );
}
