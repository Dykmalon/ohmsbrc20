// firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Import Firestore module

const firebaseConfig = {
  // Your Firebase Config Object
  apiKey: "AIzaSyBl3Faq-E9f0ExOyXZJ7vndjKO9yQfnVa0",
  authDomain: "my-project-1530793047999.firebaseapp.com",
  projectId: "my-project-1530793047999",
  storageBucket: "my-project-1530793047999.appspot.com",
  messagingSenderId: "269723037344",
  appId: "1:269723037344:web:0b593ea317a4bfd070e3c5",
  measurementId: "G-CD28NR8JLR",
  databaseURL: "https://my-project-1530793047999-default-rtdb.firebaseio.com"
};

let firebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);  // Initialize Firestore

export { auth, db, firebaseApp as default };  // Export Firestore instance as `db`