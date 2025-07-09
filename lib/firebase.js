import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore"; // 👈 add this

const firebaseConfig = {
  apiKey: "AIzaSyCjHlr6-FeejTFpKeDNTYwbofqJttlROj0",
  authDomain: "note-20216.firebaseapp.com",
  projectId: "note-20216",
  storageBucket: "note-20216.firebasestorage.app",
  messagingSenderId: "781686025954",
  appId: "1:781686025954:web:6226430e3f4e1e159fb8bb",
  measurementId: "G-MCJ90W0DM1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // 👈 Firestore instance

export {
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
  where
};




