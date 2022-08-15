import { firestoreDB } from '../main';
import {  
    collection,
    query,
    // where,
    orderBy,
    getDocs, 
} from 'firebase/firestore';

// Documentación: https://firebase.google.com/docs/firestore/manage-data/add-data

// Referencia a la collección 'asesorias-intensivas'
const asIntRef = collection(firestoreDB, 'asesorias-intensivas');

// READ
export async function getAsesoriasIntensivas() {
    // const now = new Date();
    // let oneMonthFromNow = new Date('2022-8-21');
    // oneMonthFromNow.setMonth(now.getMonth() + 1);
    // console.log(now)
    // console.log(oneMonthFromNow)

    const q = query(asIntRef,/* where('fecha',">=",now), where('fecha','<',oneMonthFromNow),*/ orderBy("fecha", "asc"));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map(doc => doc.data())

    return data;
}
