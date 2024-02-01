import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore"; 
import { getAuth, setPersistence } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDfl6nB06H-_sciuSSM_E8HQQJONdjvOVU",
  authDomain: "chiffchaff-750cb.firebaseapp.com",
  projectId: "chiffchaff-750cb",
  storageBucket: "chiffchaff-750cb.appspot.com",
  messagingSenderId: "204201021526",
  appId: "1:204201021526:web:ab249be0b68eafc3d7ebf7",
  measurementId: "G-XS21G7M8GR"
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
