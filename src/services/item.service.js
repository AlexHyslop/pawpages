import { collection, getDoc, getDocs, addDoc, where, query, setDoc, doc} from "firebase/firestore"; 
import { db } from "../store/firebase.config";

const itemsRef = collection(db, "items");

export const ITEM_SERVICE = {
    getItemById: async function getItemById(itemId, callback){
        const q = query(itemsRef, where("id", "==", itemId)); 
        const querySnapshot = await getDocs(q)
        .then((response) => callback(response))
        .catch((error) => callback(error));  
    },
    updateItem: async function updateUserDoc(itemDoc, callback){ 
        await setDoc(doc(db, "items", itemDoc.id), itemDoc)
        .then((response) => callback(response, itemDoc))
        .catch((error) => callback(error));
    },
    getItemByTagId: async function getItemByTagId(tagId, callback){
        const q = query(itemsRef, where("tagId", "==", tagId)); 
        const querySnapshot = await getDocs(q)
        .then((response) => callback(response))
        .catch((error) => callback(error));  
    }, 
    getItemsByUserId: async function getItemByUserId(userId, callback){
        const q = query(itemsRef, where("userId", "==", userId)); 
        await getDocs(q)
        .then((response) => callback(response.docs))
        .catch((error) => callback(error));  
    },
    getItemByTag: async function getItemByTag(tag, callback){
        const q = query(itemsRef, where("tag", "==", tag)); 
        await getDocs(q)
        .then((response) => callback(response.docs))
        .catch((error) => callback(error));  
    },
    createItem: async function createItem(item, callback){
        const docRef = await addDoc(itemsRef, {
            createdDate : item.createdDate,
            foundBy: "", 
            name: item.name,
            tag: item.tag,
            status:  "",
            tagId: item.tagId, 
            userId: item.userId
        }) 
        await getDoc(docRef)
        .then((response) => callback(response))
        .catch((error) => callback(error));
    },
}