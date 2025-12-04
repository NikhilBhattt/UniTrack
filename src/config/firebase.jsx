import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDdPgyHfS_xWyKsNk2EmkEP-1xCJweCUs",
  authDomain: "lostandfound-d23b4.firebaseapp.com",
  projectId: "lostandfound-d23b4",
  storageBucket: "lostandfound-d23b4.firebasestorage.app",
  messagingSenderId: "535545747280",
  appId: "1:535545747280:web:6864f1b2473d4e8d797e55",
  measurementId: "G-ZFPD7WFG2D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
