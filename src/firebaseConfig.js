// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUoQ9uCrntN4pCynZQKh5Ohe9B-y88prI",
  authDomain: "wisdomnetfsdp.firebaseapp.com",
  projectId: "wisdomnetfsdp",
  storageBucket: "wisdomnetfsdp.firebasestorage.app",
  messagingSenderId: "81870388186",
  appId: "1:81870388186:web:97f99a4ceb04697fdf1ee3",
  measurementId: "G-9J1QK59CHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
const db = getFirestore(app);
export { db };
