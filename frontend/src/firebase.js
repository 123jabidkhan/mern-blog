// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ade7b.firebaseapp.com",
  projectId: "mern-blog-ade7b",
  storageBucket: "mern-blog-ade7b.appspot.com",
  messagingSenderId: "870146006342",
  appId: "1:870146006342:web:99f6679107ee6d8537d947"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);