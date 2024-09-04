import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Your Firebase configuration here
  apiKey: "AIzaSyBzGUoeKDqhLXzldDlMKQy110n6vlGnuRs",
  authDomain: "healthcare-management-4b8a1.firebaseapp.com",
  projectId: "healthcare-management-4b8a1",
  storageBucket: "healthcare-management-4b8a1.appspot.com",
  messagingSenderId: "805674143067",
  appId: "1:805674143067:web:06221cf6c39ddf7cac5e7e",
  measurementId: "G-JSC51HWKD5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
