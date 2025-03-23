import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyARK0med9WrtdwbVc52PlDlBH_S03mLr0s",
  authDomain: "shakti-shield.firebaseapp.com",
  databaseURL: "https://shakti-shield-default-rtdb.firebaseio.com",
  projectId: "shakti-shield",
  storageBucket: "shakti-shield.firebasestorage.app",
  messagingSenderId: "834755553611",
  appId: "1:834755553611:web:af0dd04049495fd419e0ce",
  measurementId: "G-Y4L58ND7VD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };