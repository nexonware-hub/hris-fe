// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// export const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: "piper-efac2.firebaseapp.com",
//   projectId: "piper-efac2",
//   storageBucket: "piper1-6ab4f.appspot.com",
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

import { initializeApp } from 'firebase/app';

import { getMessaging } from 'firebase/messaging/sw';

import {config} from 'dotenv';
import { getAuth } from 'firebase/auth';
config();

//Firebase Config values imported from .env file
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "piper1-6ab4f.firebaseapp.com",
  projectId: "piper1-6ab4f",
  storageBucket: "piper1-6ab4f.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-CC4YYJJWHZ"
};

console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(app);
export const auth = getAuth(app);