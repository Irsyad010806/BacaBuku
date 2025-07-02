// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHsOGIHsWIcHTiRnAaYauHEEOQaHzOjjk",
  authDomain: "bacabukuapp.firebaseapp.com",
  projectId: "bacabukuapp",
  storageBucket: "bacabukuapp.firebasestorage.app",
  messagingSenderId: "170249844744",
  appId: "1:170249844744:web:81ed69c0d850ea0eb739bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app};