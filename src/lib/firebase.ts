// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// Firebase configuration 
const firebaseConfig = {
    apiKey: "AIzaSyBTmVgge0nxyNlSUtSZQrfbBrgTpKwbeZ4",
    authDomain: "food-tuck-765bd.firebaseapp.com",
    projectId: "food-tuck-765bd",
    storageBucket: "food-tuck-765bd.firebasestorage.app",
    messagingSenderId: "835687981614",
    appId: "1:835687981614:web:13cb7fe48842cecd5e75bf",
    measurementId: "G-MT0D8J173X"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase auth instance
const auth = getAuth(app);

// Google provider setup
const googleProvider = new GoogleAuthProvider();

// Email and Password Auth
export const signUpWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signInWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signUpWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error) {
    console.error("Error signing up with Google:", error);
    throw error;
  }
};


export default auth;