// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLe_Ju23Tu6L3sD5mYmcUBpn4AmlUnWCU",
  authDomain: "chat-7e244.firebaseapp.com",
  projectId: "chat-7e244",
  storageBucket: "chat-7e244.appspot.com",
  messagingSenderId: "520135509082",
  appId: "1:520135509082:web:227c2fce9ba7f0a11c8463"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}