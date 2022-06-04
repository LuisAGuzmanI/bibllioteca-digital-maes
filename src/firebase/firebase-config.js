
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyALBNCMdSWnDRsqRpXACCi4bDuA1VN5LZg",
    authDomain: "biblioteca-digital-maes.firebaseapp.com",
    projectId: "biblioteca-digital-maes",
    storageBucket: "biblioteca-digital-maes.appspot.com",
    messagingSenderId: "564628702811",
    appId: "1:564628702811:web:4b10d817b69ad84a8e217e",
    measurementId: "G-SW1BTZR1G6"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getUsuarios(db){
    const usersCol = collection(db, 'usuarios');
    const usersSnapshot = await getDocs(usersCol);
    const userList = usersSnapshot.docs.map(doc => doc.data());
    return userList;
}

export default async function getUsers(){
    return await (getUsuarios(db));
}

// console.log(await getUsers(db))

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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