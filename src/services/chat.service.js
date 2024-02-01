import { collection, getDoc, getDocs, where, query, addDoc, setDoc, doc, updateDoc, arrayRemove, deleteDoc} from "firebase/firestore"; 
import { db } from "../store/firebase.config";

const chatsRef = collection(db, "chat");

export const CHAT_SERVICE = {
    createChatDoc: async function createChatDoc(chatInfo, callback){
        const docRef = await addDoc(chatsRef, {
            userId: chatInfo.id,
            receivedMessages: [],
            sentMessages: [],
            foundUserEmail: chatInfo.email,
            foundUserName: chatInfo.name
        }) 
        const docSnap = await getDoc(docRef)
        .then((response) => callback(response))
        .catch((error) => callback(error));
    },
    updateChatDoc: async function updateChatDoc(currDoc, callback){ 
        await setDoc(doc(db, "chat", currDoc.id), currDoc)
        .then((response) => callback(response, currDoc))
        .catch((error) => callback(error));
    },
    getChatsByUserId: async function getChatsByUserId(userId, callback){
        const q = query(chatsRef, where("userId", "==", userId)); 
        await getDocs(q)
        .then((response) => callback(response.docs))
        .catch((error) => callback(error));  
    },  
    getChatDocByDocId: async function getChatDocByDocId(docId, callback) {
        const docRef = doc(chatsRef, docId); 
        await getDoc(docRef)
        .then((response) => callback(response.data()))
        .catch((error) => callback(error)); 
    }
}