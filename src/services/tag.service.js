import { collection, getDoc, getDocs, where, query, writeBatch, setDoc, doc, deleteDoc} from "firebase/firestore"; 
import { db } from "../store/firebase.config";

const tagsRef = collection(db, "tags");

export const TAG_SERVICE = {
    getTagByTag: async function getTagbyTag(tag, callback){
        const q = query(tagsRef, where("tag", "==", tag)); 
        await getDocs(q)
        .then((response) => { callback(response.docs[0]) })
        .catch((error) => callback(error));  
    },
    updateTagDoc: async function updateTagDoc(tagDoc, callback){ 
        await setDoc(doc(db, "tags", tagDoc.id), tagDoc)
        .then((response) => callback(response, tagDoc))
        .catch((error) => callback(error));
    }
}