import { firestoreDB } from '../../main';
import {
    collection,
    addDoc,
    getDocs,
    Timestamp
} from "firebase/firestore";

const materialColletion = collection(firestoreDB, "material");

export async function createMaterial(data) {

    // console.log()

    const docRef = await addDoc(materialColletion, {
        autor: data.autor,
        title: data.title,
        area: data.area,
        subject: data.subject,
        areaDisplay: data.areaDisplay,
        subjectDisplay: data.subjectDisplay,
        type: data.type,
        date: Timestamp.now(),
        storageId: 'testeo',
    });

    return docRef.id;
}

export async function getMaterials() {
    const materialsSnapshot = await getDocs(materialColletion);
    const materialList = materialsSnapshot.docs.map(doc => doc.data());
    console.log(materialList)
    return materialList;
}