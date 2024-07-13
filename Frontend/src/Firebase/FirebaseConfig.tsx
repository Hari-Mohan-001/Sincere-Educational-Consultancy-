// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sincere-consultancy.firebaseapp.com",
  projectId: "sincere-consultancy",
  storageBucket: "sincere-consultancy.appspot.com",
  messagingSenderId: "1005666072474",
  appId: "1:1005666072474:web:528d1ec2f2cb3c2cf76c23",
  measurementId: "G-VWMVMX796B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);