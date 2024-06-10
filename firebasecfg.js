import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";


const firebaseConfig = {
  apiKey: "AIzaSyB3Wa71-5A0Jdnz1sYBTTG0Fl3UxYJ3wMaM",
  authDomain: "immunify-5c493.firebaseapp.com",
  projectId: "immunify-5c493",
  storageBucket: "immunify-5c493.appspot.com",
  messagingSenderId: "168347160558",
  appId: "1:168347160558:web:9b8bda1b0e1794ee2c88ff",
  measurementId: "G-8G9D8K44Z1"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage};