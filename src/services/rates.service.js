//7BalnaiI95z9Ox6uPzwe  economy


//wiIJtpJAbiXMuCL5833w express 


import { collection, getDocs, where, getDoc, query, setDoc, doc} from "firebase/firestore"; 
import { db } from "../store/firebase.config";

const ratesRef = collection(db, "rates");

export const RATES_SERVICE = {
    
    getEconomyRates: async function getEconomyRates( callback) {
        const docRef = doc(ratesRef, '7BalnaiI95z9Ox6uPzwe'); 
        await getDoc(docRef)
        .then((response) => callback(response.data()))
        .catch((error) => callback(error)); 
    },

 
    getExpressRates: async function getExpressRates( callback) {
        const docRef = doc(ratesRef, 'wiIJtpJAbiXMuCL5833w'); 
        await getDoc(docRef)
        .then((response) => callback(response.data()))
        .catch((error) => callback(error)); 
    },

    //echos
    updateRates: async function updateRates(ratesDoc, callback){ 
        await setDoc(doc(db, "rates", ratesDoc.id), ratesDoc)
        .then((response) => callback(response, ratesDoc))
        .catch((error) => callback(error));
    },
    
}