import { firestoreDB } from '../../main';
import { getAuth } from "firebase/auth"
import {
    // collection,
    doc,
    setDoc, 
    getDoc
} from 'firebase/firestore';

// Documentación: https://firebase.google.com/docs/firestore/manage-data/add-data

// const usuariosCollection = collection(firestoreDB, 'users');

// Stores user data with User uid as reference
export async function createUser(userData, uid) {
    const docRef = doc(firestoreDB, "users", uid);
    await setDoc(docRef, userData);

    // await addDoc(usuariosCollection, { name, surname, email, career, uid });
    return docRef;
}

export async function getUser(uid) {
    const docRef = doc(firestoreDB, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

export async function getCurrentUser() {
    const docRef = doc(firestoreDB, "users", getAuth().currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

export async function checkForRolePassword(password, role) {
    const docRef = doc(firestoreDB, "users/rolesAuth/rolesAuth", role);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().password == password;
    } else {
        return false;
    }
}

// // READ
// async getUsuarios() {
//     const usersSnapshot = await getDocs(usuariosCollection);
//     const userList = usersSnapshot.docs.map(doc => doc.data());
//     return userList;
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