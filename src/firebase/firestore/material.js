import { firestoreDB } from '../../main';
import {
    collection,
    addDoc,
    getDocs,
    Timestamp,
    query,
    orderBy
} from "firebase/firestore";
import formatDate from '../../helpers/formatDate';
import getFormatedFileType from '../../helpers/getFormatedFileType';

const materialColletion = collection(firestoreDB, "material");

export async function createMaterial(data) {

    const docRef = await addDoc(materialColletion, {
        autor: data.autor,
        title: data.title,
        area: data.area,
        subject: data.subject,
        areaDisplay: data.areaDisplay,
        subjectDisplay: data.subjectDisplay,
        type: getFormatedFileType(data.type),
        date: Timestamp.now(),
        fileUrl: data.fileUrl,
    });

    return docRef.id;
}

export async function getMaterials() {
    const q = query(materialColletion, orderBy("area"));
    const materialsSnapshot = await getDocs(q);
    // const materialsSnapshot = await getDocs(materialColletion);
    const materialList = materialsSnapshot.docs.map(doc => doc.data());

    materialList.map((element) => {
        element.formatedDate = formatDate(new Date(element.date.seconds * 1000));
        return element;
    });

    // console.log(materialList)
    return materialList;
}