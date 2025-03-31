// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbuASkmdb2O0U9P1IMu5anI0tnmFkOEhs",
  authDomain: "perfect-person-website.firebaseapp.com",
  projectId: "perfect-person-website",
  storageBucket: "perfect-person-website.firebasestorage.app",
  messagingSenderId: "29486917368",
  appId: "1:29486917368:web:43fb3d047900df773abd0d",
  measurementId: "G-1ETV4M1474"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);