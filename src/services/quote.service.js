import { collection, getDoc, getDocs, where, query, addDoc, setDoc, doc, updateDoc, arrayRemove, deleteDoc} from "firebase/firestore"; 
import { db } from "../store/firebase.config";

const quotesRef = collection(db, "quote");

export const QUOTE_SERVICE = {
    createQuote: async function createQuote(quote, callback){
        const docRef = await addDoc(quotesRef, quote) 
        const docSnap = await getDoc(docRef)
        .then((response) => callback(response, quote))
        .catch((error) => callback(error, quote));
    },
    updateQuote: async function updateQuote(currDoc, callback){ 
        await setDoc(doc(db, "quote", currDoc.id), currDoc)
        .then((response) => callback(response, currDoc))
        .catch((error) => callback(error));
    },
    getChatsByUserId: async function getQuotesByUser(userId, callback){
        const q = query(quotesRef, where("userId", "==", userId)); 
        await getDocs(q)
        .then((response) => callback(response.docs))
        .catch((error) => callback(error));  
    },  
    getChatDocByDocId: async function getQuoteDocById(docId, callback) {
        const docRef = doc(quotesRef, docId); 
        await getDoc(docRef)
        .then((response) => callback(response.data()))
        .catch((error) => callback(error)); 
    }
}