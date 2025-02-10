// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User , signOut} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { updatePassword } from "firebase/auth";

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

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  
  // Sign up with email and password
  export const signUpWithEmail = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  
  // Sign in with email and password
  export const signInWithEmail = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  
  // Sign in with Google
  export const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  // Logout
  export const logout = async () => {
    return await signOut(auth);
  };

  // Get current user
  export const getCurrentUser = (): User | null => {
    return auth.currentUser;
  };

  // Initialize Firebase Storage
export const storage = getStorage(app);

// Update password
export const updateUserPassword = async (newPassword: string) => {
  if (auth.currentUser) {
    await updatePassword(auth.currentUser, newPassword);
  }
};