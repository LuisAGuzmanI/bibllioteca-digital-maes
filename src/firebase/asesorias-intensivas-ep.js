import { firestoreDB } from '../main';
import {  
    collection,
    getDocs, 
} from 'firebase/firestore';

// Documentación: https://firebase.google.com/docs/firestore/manage-data/add-data

const asesoriasIntensivasCollection = collection(firestoreDB, 'asesorias-intensivas');

// READ
export async function getAsesoriasIntensivas() {
    const asesoriasIntensivasSnapshot = await getDocs(asesoriasIntensivasCollection);
    const asesoriasIntensivasList = asesoriasIntensivasSnapshot.docs.map(doc => doc.data());
    return asesoriasIntensivasList;
}

