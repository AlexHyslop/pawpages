import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore"; 
import { getAuth, setPersistence } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyASBXlCFMpvixGpxLMRtn8d9C7dYy4Z6KM",
  authDomain: "relexco-446af.firebaseapp.com",
  projectId: "relexco-446af",
  storageBucket: "relexco-446af.appspot.com",
  messagingSenderId: "958214222713",
  appId: "1:958214222713:web:368f35afb3ee9555b235a8",
  measurementId: "G-X6HF9S6GC0"
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

 