// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-37739.firebaseapp.com",
  projectId: "mern-blog-37739",
  storageBucket: "mern-blog-37739.appspot.com",
  messagingSenderId: "350285064715",
  appId: "1:350285064715:web:3fc17a4675bf1b536c350e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);