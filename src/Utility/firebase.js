// src/Utility/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKOe5c58ixs8jhKxxtK4TofIcUWcZtEeU",
  authDomain: "project-2ee43.firebaseapp.com",
  projectId: "project-2ee43",
  storageBucket: "project-2ee43.appspot.com",
  messagingSenderId: "210662053280",
  appId: "1:210662053280:web:1aa80dfe1cbcd24f4a40c5"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
export const db = getFirestore(app);
