import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeVMFV1rUwenqDXvfiYddSkPRaMpjxuQI",
  authDomain: "milgago-3485f.firebaseapp.com",
  projectId: "milgago-3485f",
  storageBucket: "milgago-3485f.firebasestorage.app",
  messagingSenderId: "524020289916",
  appId: "1:524020289916:web:c6b8c55542bcc701c614f9",
  measurementId: "G-V52ZX4S6L5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app; 