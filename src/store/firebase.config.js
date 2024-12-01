import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore"; 
import { getAuth, setPersistence } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBOisIZyLXIrQzSyDFYGUPqnpfjKTk1r9M",
  authDomain: "pawpages-b4034.firebaseapp.com",
  projectId: "pawpages-b4034",
  storageBucket: "pawpages-b4034.firebasestorage.app",
  messagingSenderId: "847420861001",
  appId: "1:847420861001:web:ae3065028be9cbc5616d98",
  measurementId: "G-E8WB3GK0TR"
};

const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app);

setPersistence(auth)
  .then(() => {
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app); 

 