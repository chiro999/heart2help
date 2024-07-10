// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9eL7RoamdMovJUkZ5P5S-0pKqux7tc-8",
  authDomain: "heart2help-eb7a9.firebaseapp.com",
  projectId: "heart2help-eb7a9",
  storageBucket: "heart2help-eb7a9.appspot.com",
  messagingSenderId: "743382248734",
  appId: "1:743382248734:web:73011e0b6b173c1e0aed0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
