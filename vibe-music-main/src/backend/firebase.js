// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWBOZtWzqjPT-ADix-EO2DQDbVplbNCHk",
  authDomain: "live-music-ca039.firebaseapp.com",
  projectId: "live-music-ca039",
  storageBucket: "live-music-ca039.firebasestorage.app",
  messagingSenderId: "505430330951",
  appId: "1:505430330951:web:5fcc599001396e8f176b62",
  measurementId: "G-C29P9JMTW6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const __AUTH = getAuth(app);
export const __DB = getFirestore(app);

// const analytics = getAnalytics(app);