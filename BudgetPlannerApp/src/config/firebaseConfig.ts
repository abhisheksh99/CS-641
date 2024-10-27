// src/config/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCpSaTzpGAHuBXzLw8_S1AUM_XEbEBiPJU",
  authDomain: "budgetplannerapp-fcd3b.firebaseapp.com",
  projectId: "budgetplannerapp-fcd3b",
  storageBucket: "budgetplannerapp-fcd3b.appspot.com",
  messagingSenderId: "919290387219",
  appId: "1:919290387219:web:e98861248badccf40198e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
export default app;
