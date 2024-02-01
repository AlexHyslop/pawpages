import { collection, getDoc, addDoc } from "firebase/firestore"; 
import { db } from "../store/firebase.config";

const emailsRef = collection(db, "mail");

export const EMAIL_SERVICE = {
    sendEmail: async function sendEmail(email, callback){ 
        const docRef = await addDoc(emailsRef, email) 
        await getDoc(docRef)
        .then((response) => callback(response))
        .catch((error) => callback(error));
    },
}