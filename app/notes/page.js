"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import Link from "next/link";
import { format } from "date-fns";

export default function NotesList() {
  const [user] = useAuthState(auth);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "notes"),
          where("uid", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const fetchedNotes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [user]);

  if (loading) {
    return <div className="p-8 text-white">Loading notes...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🗂 Your Notes</h1>
        <Link href="/notes/new">
          <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition">
            + New Note
          </button>
        </Link>
      </div>

      {notes.length === 0 ? (
        <p>No notes yet. Create one!</p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <Link key={note.id} href={`/notes/${note.id}`}>
              <div className="p-4 border border-gray-700 rounded hover:bg-gray-800 transition cursor-pointer">
                <h2 className="text-lg font-semibold">{note.title || "(Untitled Note)"}</h2>
                <p className="text-sm text-gray-400">
                  Created:{" "}
                  {note.createdAt?.seconds
                    ? format(new Date(note.createdAt.seconds * 1000), "PPpp")
                    : "Unknown"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
