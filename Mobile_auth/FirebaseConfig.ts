// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXIije9t9hjAqDDrGkjQWTbiJQ0F2pSrU",
  authDomain: "mobileauth-8e8cb.firebaseapp.com",
  projectId: "mobileauth-8e8cb",
  storageBucket: "mobileauth-8e8cb.appspot.com",
  messagingSenderId: "669440515359",
  appId: "1:669440515359:web:19af54141a7ff9f668242a",
  measurementId: "G-HVEW8CCQZ2"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP); // Export Firestore instance
const analytics = getAnalytics(FIREBASE_APP); // Keep analytics as a local variable

export const FIREBASE_ANALYTICS = analytics; // Export analytics if needed