import { collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { db } from './firebase-config'

// Documentación: https://firebase.google.com/docs/firestore/manage-data/add-data

const usuariosCollection = collection(db, 'usuarios');

// READ
export async function getUsuarios(){
    const usersSnapshot = await getDocs(usuariosCollection);
    const userList = usersSnapshot.docs.map(doc => doc.data());
    return userList;
}

// CREATE
export async function createUsuario (usuario) {
    const docRef = await addDoc(usuariosCollection, usuario);
    return docRef; 
}

// UPDATE

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