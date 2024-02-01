import { collection, where, limit, query, writeBatch, getDocs } from "firebase/firestore"; 
import { db } from "../store/firebase.config";

const tagsRef = collection(db, "tags");

export const TOOL_SERVICE = {
    deleteEmptyTags: async function deleteEmptyTags(){
        const batch = writeBatch(db);
        var maxLimit = 499; 
        var counter = 0; 
        const emptyTags = query(tagsRef, where("tagId", "==", null), limit(500));
        getDocs(emptyTags).then(response => {
            for (let i = response.docs.length - 1; i >= 0; i--) {
                let doc = response.docs[i];
                counter++;
                batch.delete(doc.ref);
                response.docs.splice(i, 1);
                if (counter >= maxLimit) break;
            }
            return batch.commit();
        }); 
    }
}