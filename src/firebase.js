// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7KQBCf_Oeq2XKYTzgIP3-UckLeNw2424",
  authDomain: "leellifeup.firebaseapp.com",
  projectId: "leellifeup",
  storageBucket: "leellifeup.appspot.com",
  messagingSenderId: "1054727790946",
  appId: "1:1054727790946:web:652958f8aeb7811d9e0c3b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);