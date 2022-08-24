import { firestoreDB } from '../../main';
import {
    collection,
    getDocs
} from "firebase/firestore";

export async function getSubjectsFromArea(area) {
    const querySnapshot = await getDocs(collection(firestoreDB, `areas/areas/${area}`));

    let subjects = [];

    querySnapshot.forEach((doc) => {
        subjects.push({ name: doc.data().name, code: doc.id })
    });

    // console.log(subjects);

    subjects.sort((a, b) => {
        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });

    // console.log(subjects);

    return subjects;

}