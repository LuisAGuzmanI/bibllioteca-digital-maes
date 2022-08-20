import { firestoreDB } from '../../main';
import {
    collection,
    addDoc 
} from "firebase/firestore";

export async function createMaterial(data){
    const docRef = await  addDoc(collection(firestoreDB, "material"), {
        autor: data.autor,
        title: data.title,
        area: data.area,
        subject: data.subject,
        storageId: 'testeo',
     });

     return docRef.id;
}