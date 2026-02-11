// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1H9dcO9pm1Rq2arGC8EbfOwI2vhVC8uQ",
  authDomain: "giveat-share-savor.firebaseapp.com",
  projectId: "giveat-share-savor",
  storageBucket: "giveat-share-savor.firebasestorage.app",
  messagingSenderId: "1033298195199",
  appId: "1:1033298195199:web:080978ebb62223349612ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);