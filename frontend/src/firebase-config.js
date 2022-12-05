import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


export const firebaseConfig= {
  apiKey: "AIzaSyAQ3rxLnH9gP9wV92jN1PF3xmxuA0PWkvw",
  authDomain: "cineapp-f29d7.firebaseapp.com",
  projectId: "cineapp-f29d7",
  storageBucket: "cineapp-f29d7.appspot.com",
  messagingSenderId: "1066097970728",
  appId: "1:1066097970728:web:fa080d156482b78fccef1d",
  measurementId: "G-8CWCCBVKEX"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const Firestore = getFirestore(app);
export const db = getFirestore(app);
