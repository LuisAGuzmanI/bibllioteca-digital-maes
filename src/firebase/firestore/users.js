import { firestoreDB } from '../../main';
import {
    // collection,
    doc,
    setDoc
} from 'firebase/firestore';

// Documentación: https://firebase.google.com/docs/firestore/manage-data/add-data

// const usuariosCollection = collection(firestoreDB, 'users');

// CREATE
export async function createUser(userData, matricula) {
    const docRef = doc(firestoreDB, "users", matricula);
    await setDoc(docRef, userData);

    // await addDoc(usuariosCollection, { name, surname, email, career, uid });
    return docRef;
}

// // READ
// async getUsuarios() {
//     const usersSnapshot = await getDocs(usuariosCollection);
//     const userList = usersSnapshot.docs.map(doc => doc.data());
//     return userList;
// }

// async getUsuario() {
//     const docRef = doc(firestoreDB, "usuarios", "JDGkId6Df8Ev2n2Jag0L");
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//         return docSnap.data();
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//         return null;
//     }
// }


// // UPDATE
// export async function updateUsuarioById() {
//     usuariosCollection.doc('JDGkId6Df8Ev2n2Jag0L').update({matricula: "A011111111"});
// }

// export async function updateUsuario() {
//     const userRef = doc(firestoreDB, "usuarios", "A01741747");

//     // Set the "capital" field of the city 'DC'
//     await updateDoc(userRef, {
//     matricula: true
//     });
// }

// DELETE

/*
const db = firebaseApp.firestore();
const usuariosCollection = db.collection('usuarios')

export const createUsuario = usuario => {
    return usuariosCollection.add(usuario);
}

export const getUsuario = async id => {
    const usuario = await usuariosCollection.doc(id).get() 
    return usuario.exists ? usuario.data() : null;
}

export const updateUsuario = (id, usuario) => {
    return usuariosCollection.doc(id).update(usuario);
}

export const deleteUsuario = (id) => {
    return usuariosCollection.doc(id).delete();
}

// export const useLoadUsers = () => {
//     const usuarios = ref([])
//     const close = usuariosCollection.onSnapshot(snapshot => {
//         usuarios.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
//     })
//     onUnmounted(close)
//     return users
// }
*/