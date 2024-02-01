import { collection, getDoc, getDocs, where, query, addDoc, setDoc, doc, updateDoc, arrayRemove, deleteDoc} from "firebase/firestore"; 
import { db } from "../store/firebase.config";

const usersRef = collection(db, "users");

export const USER_SERVICE = {
    checkUserDocExistsOnUserId: async function checkUserDocExistsOnUserId(user, callback){
        const q = query(usersRef, where("id", "==", user.uid)); 
        await getDocs(q)
        .then((response) => callback(response, user))
        .catch((error) => callback(error));  
    },
    getUserDocByEmail: async function getUserDocByEmail(email, callback){
        const q = query(usersRef, where("email", "==", email)); 
        await getDocs(q)
        .then((response) => callback(response))
        .catch((error) => callback(error));  
    },
    getUserDocById: async function getUserDocById(id, callback){
        const q = query(usersRef, where("id", "==", id)); 
        await getDocs(q)
        .then((response) => callback(response))
        .catch((error) => callback(error));  
    },
    getUserDocByDocId: async function getUserDocById(userId, callback) {
        const docRef = doc(usersRef, userId); 
        await getDoc(docRef)
        .then((response) => callback(response.data()))
        .catch((error) => callback(error)); 
    },
    createUserDoc: async function createUserDoc(user, callback){
        const docRef = await addDoc(usersRef, {
            id: user.uid,
            email: user.email,
            fullName: user.fullName,
            dob: user.dob, 
            address : user.address,
            county : user.county,
            country: user.country,
            items: []
        }) 
        const docSnap = await getDoc(docRef)
        .then((response) => callback(response))
        .catch((error) => callback(error));
    },
    updateUserDoc: async function updateUserDoc(currDoc, callback){ 
        await setDoc(doc(db, "users", currDoc.id), currDoc)
        .then((response) => callback(response, currDoc))
        .catch((error) => callback(error));
    }
}