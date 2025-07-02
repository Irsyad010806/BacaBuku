import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHsOGIHsWIcHTiRnAaYauHEEOQaHzOjjk",
  authDomain: "bacabukuapp.firebaseapp.com",
  projectId: "bacabukuapp",
  storageBucket: "bacabukuapp.firebasestorage.app",
  messagingSenderId: "170249844744",
  appId: "1:170249844744:web:81ed69c0d850ea0eb739bd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
