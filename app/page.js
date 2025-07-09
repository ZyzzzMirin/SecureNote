"use client"; // 👈 Required to use Firebase Auth in Next.js App Router

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  db,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "../lib/firebase";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // cleanup
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">🔐 SecureNote</h1>
        <p className="text-lg text-gray-300">
          Your private, encrypted online note vault.
        </p>

        {!user ? (
          <button
            className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
            onClick={handleLogin}
          >
            Sign in with Google
          </button>
        ) : (
          <>
            <p className="text-green-400">Welcome, {user.displayName}</p>
            <button
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={handleLogout}
            >
              Sign out
            </button>
            <Link href="/notes">
              <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Go to Notes
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
